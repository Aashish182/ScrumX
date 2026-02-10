
# # import os
# # import re
# # os.environ["CUDA_VISIBLE_DEVICES"] = ""

# # from fastapi import FastAPI
# # from fastapi.middleware.cors import CORSMiddleware
# # from pydantic import BaseModel
# # from datetime import datetime
# # from typing import Optional, List

# # from pymongo import MongoClient
# # from bson import ObjectId

# # from sentence_transformers import SentenceTransformer, util

# # # ==================================================
# # # 1. FASTAPI INIT
# # # ==================================================
# # app = FastAPI(title="ScrumX AI Daily Standup Bot")

# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["*"],
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )

# # # ==================================================
# # # 2. DATABASE (MONGODB ONLY)
# # # ==================================================
# # mongo = MongoClient("mongodb://localhost:27017")
# # db = mongo["scrumbotdb"]

# # subtasks_col = db["subtasks"]
# # standups_col = db["standups"]
# # blockers_col = db["blockers"]

# # # ==================================================
# # # 3. NLP MODEL
# # # ==================================================
# # embedder = SentenceTransformer("all-MiniLM-L6-v2", device="cpu")

# # # ==================================================
# # # 4. REQUEST MODEL
# # # ==================================================
# # class ChatRequest(BaseModel):
# #     developer_id: str
# #     message: str

# # # ==================================================
# # # 5. INTENT DETECTION
# # # ==================================================
# # def detect_intent(text: str) -> str:
# #     t = text.lower()

# #     QUERY_KEYWORDS = [
# #         "what did i", "show my standup", "view standup",
# #         "show tasks", "my progress"
# #     ]

# #     EDIT_KEYWORDS = [
# #         "edit", "change", "update yesterday",
# #         "modify standup", "correct standup"
# #     ]

# #     UPDATE_KEYWORDS = [
# #         "completed", "done", "finished",
# #         "working on", "today working", "started",
# #         "blocked", "no blockers"
# #     ]

# #     if any(keyword in t for keyword in QUERY_KEYWORDS):
# #         return "QUERY"

# #     if any(keyword in t for keyword in EDIT_KEYWORDS):
# #         return "EDIT"

# #     if any(keyword in t for keyword in UPDATE_KEYWORDS):
# #         return "STANDUP_UPDATE"

# #     return "UNKNOWN"

# # # ==================================================
# # # 6. NLP HELPERS
# # # ==================================================
# # def has_no_blockers(text: str) -> bool:
# #     return any(p in text.lower() for p in [
# #         "no blocker", "no blockers", "not blocked", "without blockers"
# #     ])
# # def detect_status(text: str) -> Optional[str]:
# #     t = text.lower()

# #     if any(w in t for w in ["blocked", "stuck", "issue", "error"]):
# #         return "Blocked"

# #     if any(w in t for w in [
# #         "working on", "working", "implementing",
# #         "building", "creating", "today working"
# #     ]):
# #         return "In Progress"

# #     if any(w in t for w in ["done", "completed", "finished"]):
# #         return "Done"

# #     return None

# # def extract_percent(status: str) -> Optional[int]:
# #     if status == "Done":
# #         return 100
# #     if status == "In Progress":
# #         return 60
# #     return None

# # def match_subtask(sentence: str):
# #     subtasks = list(subtasks_col.find({}))
# #     if not subtasks:
# #         return None, 0.0

# #     titles = [s["title"] for s in subtasks]
# #     sent_emb = embedder.encode(sentence, convert_to_tensor=True)
# #     task_emb = embedder.encode(titles, convert_to_tensor=True)

# #     scores = util.cos_sim(sent_emb, task_emb)[0]
# #     idx = scores.argmax().item()

# #     return subtasks[idx], float(scores[idx])

# # # ==================================================
# # # 7. QUERY HANDLER
# # # ==================================================
# # def handle_query(dev_id: str):
# #     last = standups_col.find_one(
# #         {"developer_id": dev_id},
# #         sort=[("created_at", -1)]
# #     )

# #     subtasks = list(subtasks_col.find(
# #         {"assignee": dev_id},
# #         {"title": 1, "status": 1, "percent_complete": 1}
# #     ))

# #     return {
# #         "last_standup": last,
# #         "current_tasks": subtasks
# #     }

# # # ==================================================
# # # 8. EDIT HANDLER (BASIC)
# # # ==================================================
# # def handle_edit(dev_id: str, message: str):
# #     last = standups_col.find_one(
# #         {"developer_id": dev_id},
# #         sort=[("created_at", -1)]
# #     )

# #     if not last:
# #         return {"message": "No standup found to edit"}

# #     standups_col.update_one(
# #         {"_id": last["_id"]},
# #         {"$set": {"message": message, "edited_at": datetime.utcnow()}}
# #     )

# #     return {"message": "Last standup updated"}

# # # ==================================================
# # # 9. CHAT ENDPOINT
# # # ==================================================
# # @app.post("/chat")
# # def chat(req: ChatRequest):

# #     intent = detect_intent(req.message)

# #     if intent == "QUERY":
# #         return handle_query(req.developer_id)

# #     if intent == "EDIT":
# #         return handle_edit(req.developer_id, req.message)

# #     if intent != "STANDUP_UPDATE":
# #         return {"intent": intent, "message": "No action detected"}

# #     sentences = [
# #         s.strip()
# #         for s in re.split(r"[.,]| and | then | also ", req.message, flags=re.I)
# #         if s.strip()
# #     ]

# #     no_blockers = has_no_blockers(req.message)
# #     updates = []
# #     replies = []

# #     for s in sentences:
# #         subtask, score = match_subtask(s)
# #         if not subtask or score < 0.40:
# #             continue

# #         status = detect_status(s)
# #         if not status:
# #             continue

# #         if status == "Blocked" and no_blockers:
# #             continue

# #         percent = extract_percent(status)

# #         subtasks_col.update_one(
# #             {"_id": subtask["_id"]},
# #             {"$set": {
# #                 "status": status,
# #                 "percent_complete": percent,
# #                 "updated_at": datetime.utcnow()
# #             }}
# #         )

# #         if status == "Blocked":
# #             blockers_col.insert_one({
# #                 "subtask_id": subtask["_id"],
# #                 "reason": s,
# #                 "reported_by": req.developer_id,
# #                 "created_at": datetime.utcnow()
# #             })

# #         updates.append({
# #             "subtask_id": str(subtask["_id"]),
# #             "title": subtask["title"],
# #             "status": status,
# #             "confidence": round(score, 2)
# #         })

# #         replies.append(f"✅ {subtask['title']} → {status}")

# #     standups_col.insert_one({
# #         "developer_id": req.developer_id,
# #         "message": req.message,
# #         "intent": intent,
# #         "no_blockers": no_blockers,
# #         "updates": updates,
# #         "created_at": datetime.utcnow()
# #     })

# #     if not updates:
# #         return {"reply": "❓ No confident task match found"}

# #     return {
# #         "intent": intent,
# #         "reply": "\n".join(replies),
# #         "updates": updates
# #     }

# # # ==================================================
# # # 10. HEALTH CHECK
# # # ==================================================
# # @app.get("/")
# # def root():
# #     return {"status": "ScrumX AI Bot Running"}
# import os
# import re
# from datetime import datetime
# from typing import Optional, List

# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from pymongo import MongoClient
# from bson import ObjectId
# from sentence_transformers import SentenceTransformer, util

# # Disable GPU to save resources (running on CPU)
# os.environ["CUDA_VISIBLE_DEVICES"] = ""

# # ==================================================
# # 1. FASTAPI & MIDDLEWARE
# # ==================================================
# app = FastAPI(title="ScrumX AI Daily Standup Bot")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ==================================================
# # 2. DATABASE CONFIGURATION (scrumx DB)
# # ==================================================
# # Connecting to your existing MongoDB setup
# mongo = MongoClient("mongodb://localhost:27017")
# db = mongo["scrumx"] 

# # Collections mapped to your Node.js schema
# users_col = db["users"]
# sprints_col = db["sprints"]
# user_stories_col = db["userstories"]
# tasks_col = db["tasks"]
# subtasks_col = db["subtasks"]
# updates_col = db["updates"]
# blockers_col = db["blockers"]

# # ==================================================
# # 3. NLP & AI INITIALIZATION
# # ==================================================
# # Using a lightweight, fast transformer for task matching
# embedder = SentenceTransformer("all-MiniLM-L6-v2", device="cpu")

# class ChatRequest(BaseModel):
#     developer_id: str  # The _id from your Node.js userModel
#     message: str

# # ==================================================
# # 4. LOGIC HELPERS
# # ==================================================

# def detect_status(text: str) -> Optional[str]:
#     """Detects the status of a task from a sentence."""
#     t = text.lower()
#     if any(w in t for w in ["blocked", "stuck", "issue", "error", "problem"]):
#         return "Blocked"
#     if any(w in t for w in ["working", "implementing", "creating", "building", "today"]):
#         return "In Progress"
#     if any(w in t for w in ["done", "completed", "finished", "ready"]):
#         return "Done"
#     return "To Do"

# def match_subtask(sentence: str):
#     """Matches a sentence to the most similar subtask in the DB."""
#     subtasks = list(subtasks_col.find({}))
#     if not subtasks:
#         return None, 0.0

#     titles = [s["title"] for s in subtasks]
#     sent_emb = embedder.encode(sentence, convert_to_tensor=True)
#     task_emb = embedder.encode(titles, convert_to_tensor=True)

#     scores = util.cos_sim(sent_emb, task_emb)[0]
#     idx = scores.argmax().item()

#     return subtasks[idx], float(scores[idx])

# # ==================================================
# # 5. CHAT ENDPOINT (THE MAIN ENGINE)
# # ==================================================

# @app.post("/chat")
# def chat(req: ChatRequest):
#     # 1. Validate Developer ID (Compatible with Node.js ObjectIds)
#     try:
#         user_oid = ObjectId(req.developer_id)
#         user = users_col.find_one({"_id": user_oid})
#         if not user:
#             return {"success": False, "reply": "Developer not found in ScrumX records."}
#     except Exception:
#         return {"success": False, "reply": "Invalid Developer ID format."}

#     # 2. Split complex messages into distinct sentences
#     sentences = [
#         s.strip() 
#         for s in re.split(r"[.,]| and | then | also ", req.message, flags=re.I) 
#         if s.strip()
#     ]

#     updates_for_log = []
#     replies = []

#     for s in sentences:
#         # Match sentence to subtask (threshold 0.45 for accuracy)
#         subtask, score = match_subtask(s)
#         if not subtask or score < 0.45:
#             continue

#         status = detect_status(s)
#         percent = 100 if status == "Done" else (60 if status == "In Progress" else 0)

#         # 3. Update the 'subtasks' collection directly
#         subtasks_col.update_one(
#             {"_id": subtask["_id"]},
#             {"$set": {
#                 "status": status,
#                 "percent_complete": percent,
#                 "updated_at": datetime.utcnow()
#             }}
#         )

#         # 4. If Blocked, create a new record in 'blockers'
#         if status == "Blocked":
#             blockers_col.insert_one({
#                 "subtask_id": subtask["_id"],
#                 "reason": s,
#                 "reportedby_id": user_oid, # Links to Node.js User._id
#                 "created_at": datetime.utcnow()
#             })

#         # Track what was updated for the standup log
#         updates_for_log.append({
#             "subtask_id": subtask["_id"],
#             "subtask_title": subtask["title"],
#             "status": status,
#             "confidence": round(score, 2)
#         })
#         replies.append(f"✅ {subtask['title']} updated to {status}")

#     # 5. Log the entire daily standup in 'updates' collection
#     if updates_for_log:
#         standup_entry = {
#             "developer_id": user_oid,
#             "message": req.message,
#             "updates": updates_for_log,
#             "created_at": datetime.utcnow()
#         }
#         updates_col.insert_one(standup_entry)
        
#         return {
#             "success": True,
#             "reply": "\n".join(replies),
#             "developer": user.get("name", "Team Member")
#         }

#     return {
#         "success": False,
#         "reply": "I heard you, but I couldn't match your message to any specific subtasks. Please be more specific about the task title."
#     }

# # ==================================================
# # 6. HEALTH CHECK
# # ==================================================
# @app.get("/")
# def health():
#     return {"status": "ScrumX AI Engine Online", "database": "Connected to scrumx"}

import os
import re
from datetime import datetime
from typing import Optional, List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer, util

# Shared database config
try:
    from db_config import get_coll, to_oid
except ImportError:
    from app.db_config import get_coll, to_oid

os.environ["CUDA_VISIBLE_DEVICES"] = ""

# ==================================================
# 1. INIT & MIDDLEWARE
# ==================================================
app = FastAPI(title="ScrumX AI Daily Standup Bot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load NLP Model
embedder = SentenceTransformer("all-MiniLM-L6-v2", device="cpu")

# ==================================================
# 2. DATA MODELS
# ==================================================
class ChatRequest(BaseModel):
    developer_id: str
    message: str

# ==================================================
# 3. INTENT & NLP HELPERS (YOUR ORIGINAL LOGIC)
# ==================================================
def detect_intent(text: str) -> str:
    t = text.lower()
    QUERY_KEYWORDS = ["what did i", "show my standup", "view standup", "show tasks", "my progress"]
    EDIT_KEYWORDS = ["edit", "change", "update yesterday", "modify standup", "correct standup"]
    UPDATE_KEYWORDS = ["completed", "done", "finished", "working on", "today working", "started", "blocked"]

    if any(keyword in t for keyword in QUERY_KEYWORDS): return "QUERY"
    if any(keyword in t for keyword in EDIT_KEYWORDS): return "EDIT"
    if any(keyword in t for keyword in UPDATE_KEYWORDS): return "STANDUP_UPDATE"
    return "UNKNOWN"

def detect_status(text: str) -> Optional[str]:
    t = text.lower()
    if any(w in t for w in ["blocked", "stuck", "issue", "error"]): return "Blocked"
    if any(w in t for w in ["working", "implementing", "creating", "building", "today"]): return "In Progress"
    if any(w in t for w in ["done", "completed", "finished", "ready"]): return "Done"
    return None

def extract_percent(status: str) -> Optional[int]:
    if status == "Done": return 100
    if status == "In Progress": return 60
    return None

def match_subtask(sentence: str):
    subtasks_col = get_coll("subtasks")
    subtasks = list(subtasks_col.find({}))
    if not subtasks: return None, 0.0

    titles = [s["title"] for s in subtasks]
    sent_emb = embedder.encode(sentence, convert_to_tensor=True)
    task_emb = embedder.encode(titles, convert_to_tensor=True)

    scores = util.cos_sim(sent_emb, task_emb)[0]
    idx = scores.argmax().item()
    return subtasks[idx], float(scores[idx])

# ==================================================
# 4. HANDLERS (YOUR ORIGINAL LOGIC)
# ==================================================
def handle_query(dev_id: str):
    standups_col = get_coll("updates") # Matching your schema name
    subtasks_col = get_coll("subtasks")
    
    last = standups_col.find_one({"developer_id": to_oid(dev_id)}, sort=[("created_at", -1)])
    subtasks = list(subtasks_col.find({"assignee_id": to_oid(dev_id)}, {"title": 1, "status": 1}))
    
    # Cleaning up ObjectId for JSON response
    if last: last["_id"] = str(last["_id"])
    return {"last_standup": last, "current_tasks": str(subtasks)}

# ==================================================
# 5. MAIN CHAT ENDPOINT
# ==================================================
@app.post("/chat")
def chat(req: ChatRequest):
    intent = detect_intent(req.message)
    
    if intent == "QUERY":
        return handle_query(req.developer_id)

    if intent != "STANDUP_UPDATE":
        return {"reply": "I recognized your intent as " + intent + ", but I'm specialized in task updates right now."}

    # Process sentences
    sentences = [s.strip() for s in re.split(r"[.,]| and | then ", req.message, flags=re.I) if s.strip()]
    
    subtasks_col = get_coll("subtasks")
    blockers_col = get_coll("blockers")
    updates_col = get_coll("updates")
    
    replies = []
    update_logs = []

    for s in sentences:
        subtask, score = match_subtask(s)
        if not subtask or score < 0.45: continue

        status = detect_status(s)
        if not status: continue

        percent = extract_percent(status)

        # Update DB
        subtasks_col.update_one(
            {"_id": subtask["_id"]},
            {"$set": {"status": status, "percent_complete": percent, "updated_at": datetime.utcnow()}}
        )

        if status == "Blocked":
            blockers_col.insert_one({
                "subtask_id": subtask["_id"],
                "reason": s,
                "reported_by": to_oid(req.developer_id),
                "created_at": datetime.utcnow()
            })

        replies.append(f"✅ {subtask['title']} updated to {status}")
        update_logs.append({"title": subtask['title'], "status": status})

    # Log the session
    if update_logs:
        updates_col.insert_one({
            "developer_id": to_oid(req.developer_id),
            "message": req.message,
            "updates": update_logs,
            "created_at": datetime.utcnow()
        })

    return {"reply": "\n".join(replies) if replies else "No task updates matched."}

@app.get("/")
def health():
    return {"status": "ScrumX Engine Online"}