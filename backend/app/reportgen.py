from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from db_config import get_coll, to_oid
from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace

app = Flask(__name__)
CORS(app)
llm = HuggingFaceEndpoint(repo_id="meta-llama/Llama-3.1-8B-Instruct", task="text-generation")
model = ChatHuggingFace(llm=llm)

@app.route("/generate_report", methods=["POST"])
def generate_report():
    data = request.json
    dev_id = to_oid(data.get("developer_id"))
    
    # Fetch recent history for this specific developer
    history = list(get_coll("standups").find({"developer_id": dev_id}).limit(5))
    
    prompt = f"Analyze this Scrum developer's recent work and generate a professional performance summary: {history}"
    response = model.invoke(prompt)
    
    report_id = get_coll("reports").insert_one({
        "developer_id": dev_id,
        "content": response.content,
        "created_at": datetime.utcnow()
    }).inserted_id

    return jsonify({"success": True, "report": response.content, "report_id": str(report_id)})

if __name__ == "__main__":
    app.run(port=5003, debug=True)