from convex import ConvexClient

class ConvexSimpleDB:
    def __init__(self, convex_url):
        print("✅ Connected to Convex")
        self.client = ConvexClient(convex_url)

    def add_task_only(self, text):
        print("📤 Sending to Convex:", {"text": text})

        try:
            result = self.client.mutation("todos:addTask", {"text": text})
            return {"success": True, "result": result}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def get_todos(self):
        try:
            result = self.client.query("todos:getTodos", {})

            if not isinstance(result, list):
                print("❌ Convex did not return a list:", result)
                return []

            return result

        except Exception as e:
            print("❌ Convex getTodos error:", e)
            return []

    def mark_done(self, todo_id):
        try:
            result = self.client.mutation(
                "todos:mark_done_Todo",
                {
                    "id": todo_id,
                    "isCompleted": True
                }
            )
            return {"success": True, "result": result}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def mark_undone(self, todo_id):
        try:
            result = self.client.mutation(
                "todos:mark_undone_Todo",
                {
                    "id": todo_id,
                    "isCompleted": False
                }
            )
            return {"success": True, "result": result}
        except Exception as e:
            return {"success": False, "error": str(e)}

    def delete_todo(self, todo_id):
        try:
            result = self.client.mutation(
                "todos:deleteTodo",
                {
                    "id": todo_id,
                }
            )
            return {"success": True, "result": result}
        except Exception as e:
            return {"success": False, "error": str(e)}


    def edit_task(self, todo_id, new_text):
        try:
            result = self.client.mutation(
                "todos:editTodo",
                {
                    "id": todo_id,
                    "text": new_text
                }
            )
            return {"success": True, "result": result}

        except Exception as e:
            return {"success": False, "error": str(e)}

    def delete_multiple_todo(self, todo_ids):
        try:
            result = self.client.mutation(
                "todos:deleteMultipleTodo",
                {
                    "ids": todo_ids,
                }
            )
            return {"success": True, "result": result}
        except Exception as e:
            return {"success": False, "error": str(e)}


