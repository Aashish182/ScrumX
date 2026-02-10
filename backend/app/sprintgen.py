import json, re
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, date
from db_config import get_coll, to_oid
from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace
from langchain_core.prompts import PromptTemplate

app = Flask(__name__)
CORS(app)

llm = HuggingFaceEndpoint(repo_id="meta-llama/Llama-3.1-8B-Instruct", task="text-generation")
model = ChatHuggingFace(llm=llm)

SPRINT_PROMPT = PromptTemplate(
    input_variables=["stories"],
    template="You are an Agile Scrum AI. Break these stories: {stories} into Tasks and Subtasks. Output ONLY valid JSON with sprint_name, sprint_goal, and stories (containing tasks and subtasks)."
)

@app.route("/generate_sprint", methods=["POST"])
def generate_sprint():
    try:
        data = request.json
        dev_id = to_oid(data.get("developer_id"))
        
        prompt = SPRINT_PROMPT.invoke({"stories": json.dumps(data["user_stories"])})
        response = model.invoke(prompt)
        
        # Extract JSON from LLM response
        match = re.search(r"\{.*\}", response.content, re.DOTALL)
        sprint_data = json.loads(match.group())

        # 1. Insert Sprint
        sprint_id = get_coll("sprints").insert_one({
            "name": sprint_data["sprint_name"],
            "goal": sprint_data["sprint_goal"],
            "project_id": to_oid(data.get("project_id")),
            "created_by": dev_id,
            "status": "Active",
            "created_at": datetime.utcnow()
        }).inserted_id

        # 2. Insert Stories, Tasks, and Subtasks
        for story in sprint_data.get("stories", []):
            story_id = get_coll("user_stories").insert_one({
                "title": story["title"],
                "sprint_id": sprint_id,
                "created_at": datetime.utcnow()
            }).inserted_id

            for task in story.get("tasks", []):
                t_id = get_coll("tasks").insert_one({
                    "title": task["title"],
                    "story_id": story_id,
                    "created_at": datetime.utcnow()
                }).inserted_id

                for sub in task.get("subtasks", []):
                    get_coll("subtasks").insert_one({
                        "title": sub["title"],
                        "task_id": t_id,
                        "assignee_id": dev_id, # Dynamically assigned to requester
                        "status": "Pending",
                        "estimated_hours": sub.get("estimated_hours", 0), # GET FROM LLM JSON
                        "actual_hours": 0,
                        "percent_complete": 0,
                        "created_at": datetime.utcnow()
                    })

        return jsonify({"success": True, "sprint_id": str(sprint_id)})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001, debug=True)