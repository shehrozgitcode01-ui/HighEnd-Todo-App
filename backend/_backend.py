class TodoApp:
  def __init__(self):
      self.todo_list = []

  def add_task(self, task: str):
      if not task.strip():
          return ["Task cannot be empty ❌"]

      self.todo_list.append({"task": task, "done": False})
      return [f"Task added > {task} ✅"]



