from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

from backend.backend_db import backend_DB

app = Flask(__name__)
CORS(app)

# Load variables
load_dotenv()

# Read Convex URL from ENV
CONVEX_URL = os.getenv("CONVEX_URL")

print("🚀 Backend starting...")
#print(f"Using Convex URL: {CONVEX_URL}")

# Initialize Todo class
todo = backend_DB(CONVEX_URL)


@app.route('/add', methods=['POST'])
def add_task_api():
    data = request.get_json() or {}
    task = data.get('task', '')


    if not isinstance(task, str):
        return jsonify({'error': 'Task must be a string'}), 400

    if not task.strip():
        return jsonify({'error': 'Task cannot be empty'}), 400

    result = todo.add_task_db(task)
    return jsonify(result), 201

@app.get("/todos")
def get_todos_api():
    todos = todo.get_todos_db()
    return jsonify(todos), 200

@app.route("/done/<string:todo_id>", methods=["PUT"])
def mark_done_api(todo_id):
    result = todo.mark_done_db(todo_id)

    if "error" in result:
        return jsonify(result), 400

    return jsonify(result), 200

@app.route("/undone/<string:todo_id>", methods=["PUT"])
def mark_undone_api(todo_id):
    result = todo.mark_undone_db(todo_id)

    if "error" in result:
        return jsonify(result), 400

    return jsonify(result), 200

@app.route("/delete/<string:todo_id>", methods=["DELETE"])
def delete_todo_api(todo_id):
    result = todo.delete_todo_db(todo_id)

    if "error" in result:
        return jsonify(result), 400

    return jsonify(result), 200

@app.route("/edit/<todo_id>", methods=["PUT"])
def edit_todo(todo_id):
    data = request.get_json() or {}
    new_text = data.get("text")

    if not new_text:
        return jsonify({"error": "Text is required"}), 400

    result = todo.edit_task_db(todo_id, new_text)
    return jsonify(result), 200

@app.route('/delete-multiple', methods=['DELETE'])
def delete_multiple():
    try:
        data = request.get_json()
        todo_ids = data.get('ids', []) # This gets the ['id1', 'id2'] list from JS

        if not todo_ids:
            return jsonify({"error": "No IDs provided"}), 400

        result = todo.delete_multiple_todo_db(todo_ids)
        print(result)

        return jsonify(result), 200

    except Exception as e:
        print(f"Error in bulk delete: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
