# # import subprocess
# # import sys
# # import time
# # import os

# # # Get the directory where this script is located (backend/app/)
# # script_dir = os.path.dirname(os.path.abspath(__file__))

# # # List of all your files to run
# # scripts = [
# #     "sprintgen.py", 
# #     "reportgen.py", 
# #     "bot.py",
# #     "chat_bot.py" 
# # ]

# # processes = []

# # print("🚀 Starting ScrumX AI Microservices & Chatbot...")

# # for script_name in scripts:
# #     script_path = os.path.join(script_dir, script_name)
    
# #     # Check if file exists before running
# #     if os.path.exists(script_path):
# #         p = subprocess.Popen([sys.executable, script_path])
# #         processes.append(p)
# #         print(f"✅ Started {script_name}")
# #     else:
# #         print(f"❌ Error: {script_name} not found in {script_dir}")

# # print("\n--- All services are live. Press Ctrl+C to stop. ---")

# # try:
# #     while True:
# #         time.sleep(1)
# # except KeyboardInterrupt:
# #     print("\n🛑 Stopping all services...")
# #     for p in processes:
# #         p.terminate()

# import subprocess
# import sys
# import time
# import os

# # Get absolute paths
# script_dir = os.path.dirname(os.path.abspath(__file__)) # backend/app
# root_dir = os.path.join(script_dir, "..")              # backend

# # Set environment variables so scripts find db_config.py
# env = os.environ.copy()
# env["PYTHONPATH"] = script_dir + os.pathsep + env.get("PYTHONPATH", "")

# processes = []

# print("🚀 Starting ScrumX AI Microservices...")

# # 1. Start the Chatbot (FastAPI using Uvicorn)
# # We use app.bot because we are running from the backend root
# print("📡 Starting bot.py with Uvicorn...")
# bot_process = subprocess.Popen(
#     ["uvicorn", "app.bot:app", "--host", "127.0.0.1", "--port", "5002"],
#     cwd=root_dir,
#     env=env
# )
# processes.append(bot_process)

# # 2. Start the other Flask services
# other_scripts = ["sprintgen.py", "reportgen.py", "chat_bot.py"]

# for script in other_scripts:
#     script_path = os.path.join(script_dir, script)
#     if os.path.exists(script_path):
#         # We run these with the custom PYTHONPATH env
#         p = subprocess.Popen([sys.executable, script_path], env=env)
#         processes.append(p)
#         print(f"✅ Started {script}")

# print("\n--- All services are live. ---")

# try:
#     while True:
#         time.sleep(1)
# except KeyboardInterrupt:
#     print("\n🛑 Stopping all services...")
#     for p in processes:
#         p.terminate()


import subprocess
import sys
import time
import os

script_dir = os.path.dirname(os.path.abspath(__file__))

if not script_dir:
    script_dir = os.getcwd()

processes = []

print("🚀 Starting ScrumX AI Microservices from the /app directory...")


print("📡 Starting bot.py on Port 5002...")
bot_process = subprocess.Popen(
    ["uvicorn", "bot:app", "--host", "127.0.0.1", "--port", "5002"],
    cwd=script_dir
)
processes.append(bot_process)

other_scripts = ["sprintgen.py", "reportgen.py", "chat_bot.py"]

for script in other_scripts:
    script_path = os.path.join(script_dir, script)
    
    if os.path.exists(script_path):
        # We run these using the current python interpreter
        p = subprocess.Popen([sys.executable, script_path], cwd=script_dir)
        processes.append(p)
        print(f"✅ Started {script} on its configured port")
    else:
        print(f"❌ Warning: {script} not found in {script_dir}")

print("\n--- All services are now initializing. Press Ctrl+C to stop all. ---")

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("\n🛑 Stopping all AI services...")
    for p in processes:
        p.terminate()
    print("Done.")