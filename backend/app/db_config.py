import os
from pymongo import MongoClient
from bson import ObjectId
from dotenv import load_dotenv

load_dotenv()

# Connects to the same DB as your Node.js app
client = MongoClient(os.getenv("MONGODB_URI"))
# This automatically grabs the database name from the URI (e.g., 'scrumbotdb')
db = client.get_database()

def get_coll(name):
    return db[name]

def to_oid(id_str):
    """Converts string ID from Frontend/Node to BSON ObjectId."""
    try:
        return ObjectId(id_str) if id_str else None
    except:
        return None