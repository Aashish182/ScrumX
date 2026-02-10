import re
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from db_config import get_coll, to_oid
from sentence_transformers import SentenceTransformer, util

app = Flask(__name__)
CORS(app)
embedder = SentenceTransformer("all-MiniLM-L6-v2", device="cpu")

def detect_status(text):
    t = text.lower()
    if any(w in t for w in ["done", "complete", "finish"]): return "Done"
    if any(w in t for w in ["block", "stuck", "error"]): return "Blocked"
    return "In Progress"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    message = data["message"]
    dev_id = to_oid(data.get("developer_id"))

    # Only match against subtasks assigned to THIS specific developer
    my_tasks = list(get_coll("subtasks").find({"assignee_id": dev_id}))
    if not my_tasks:
        return jsonify({"reply": "No tasks currently assigned to you."})

    titles = [t["title"] for t in my_tasks]
    sentences = [s.strip() for s in re.split(r"[.,]| and ", message) if s.strip()]
    
    replies = []
    for s in sentences:
        s_emb = embedder.encode(s, convert_to_tensor=True)
        t_emb = embedder.encode(titles, convert_to_tensor=True)
        scores = util.cos_sim(s_emb, t_emb)[0]
        
        if scores.max() > 0.45:
            matched_task = my_tasks[scores.argmax().item()]
            status = detect_status(s)
            
            get_coll("subtasks").update_one(
                {"_id": matched_task["_id"]},
                {"$set": {"status": status, "updated_at": datetime.utcnow()}}
            )

            if status == "Blocked":
                get_coll("blockers").insert_one({
                    "subtask_id": matched_task["_id"],
                    "reason": s,
                    "reported_by": dev_id,
                    "created_at": datetime.utcnow()
                })
            
            replies.append(f"✅ Updated **{matched_task['title']}** to **{status}**")

    # Log the standup entry
    get_coll("standups").insert_one({
        "developer_id": dev_id,
        "raw_message": message,
        "created_at": datetime.utcnow()
    })

    return jsonify({"reply": "\n".join(replies) if replies else "Could not match any tasks."})

if __name__ == "__main__":
    app.run(port=5002, debug=True)