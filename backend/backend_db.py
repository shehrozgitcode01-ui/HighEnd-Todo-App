from backend._backend import TodoApp
from backend.database.convex_db import ConvexSimpleDB

class backend_DB(TodoApp):
    """Adds ONLY add_task database functionality to your TodoApp"""

    def __init__(self, convex_url=None):
        super().__init__()
        self.db = None

        if convex_url:
            print("🔄 Initializing with database support for add_task only")
            try:
                self.db = ConvexSimpleDB(convex_url)
                print("✅ Database client created successfully")
            except Exception as e:
                print(f"❌ Failed to create database client: {e}")
                self.db = None
        else:
            print("⚠️  Running without database (local memory only)")

    def add_task_db(self, task: str):
        """
        Override ONLY add_task to save to database
        All other methods remain unchanged
        """
        # 1. First, run your original add_task logic
        result = super().add_task(task)

        # 2. If successful locally, also save to database
        if self.db and not result[0].startswith("Task cannot"):
            print(f"🔄 Syncing to database: {task}")

            try:
                db_result = self.db.add_task_only(task)

                # ⚠️ FIX: Check if db_result is None first
                if db_result is None:
                    print(f"⚠️  Database returned None for: {task}")
                elif db_result.get("success"):
                    print(f"✅ Database sync successful for: {task}")
                    #print(f"   Task ID: {db_result.get('_id')}")
                    print(f"{db_result}")
                else:
                    error_msg = db_result.get("error", "Unknown error")
                    print(f"⚠️  Database sync failed: {error_msg}")


            except Exception as e:
                print(f"⚠️  Exception during database sync: {e}")

        return result  # Return same result as original

    def get_todos_db(self):
        if not self.db:
            return []

        raw = self.db.get_todos()

        if not isinstance(raw, list):
            return []

        normalized = []

        for t in raw:
            if isinstance(t, dict):
                normalized.append({
                    "_id": t.get("_id"),
                    "text": t.get("text", ""),
                    "isCompleted": t.get("isCompleted", False),
                })

        return normalized

    def mark_done_db(self, todo_id: str):
        try:
            if not self.db:
                return []

            result = self.db.mark_done(todo_id)

            return {"success": True, "result": result}

        except Exception as e:
            return {"success": False, "error": str(e)}

    def mark_undone_db(self, todo_id: str):
        try:
            if not self.db:
                return []

            result = self.db.mark_undone(todo_id)

            return {"success": True, "result": result}

        except Exception as e:
            return {"success": False, "error": str(e)}

    def delete_todo_db(self, todo_id: str):
        try:
            if not self.db:
                return []

            result = self.db.delete_todo(todo_id)

            return {"success": True, "result": result}

        except Exception as e:
            return {"success": False, "error": str(e)}


    def edit_task_db(self, todo_id: str, new_text: str):
        try:
            if not self.db:
                return []

            result = self.db.edit_task(todo_id, new_text)

            return {"success": True, "result": result}

        except Exception as e:
            return {"success": False, "error": str(e)}


    def delete_multiple_todo_db(self, todo_ids: str):
        try:
            if not self.db:
                return []

            result = self.db.delete_multiple_todo(todo_ids)

            return {"success": True, "result": result}

        except Exception as e:
            return {"success": False, "error": str(e)}



