const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

console.log("Backend:", BACKEND_URL);

export const addTask = async (taskText: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/add`, {   // 👈 use backend URL here
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: taskText }),
    });

    return await response.json();

  } catch (err) {
    console.log("❌ Error while adding todo:", err);
    throw err;
  }
};

export const getTodos = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/todos`, {
      method: "GET",
    });

    const data = await response.json();

    //console.log("✅ Normalized todos from backend:", data);

    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.log("Error:", err);
    return [];
  }
};

export const markTodoDone = async (todoId: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/done/${todoId}`, {
      method: "PUT",
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("❌ Error marking todo done:", err);
    throw err;
  }
};

export const markTodoUnDone = async (todoId: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/undone/${todoId}`, {
      method: "PUT",
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("❌ Error marking todo undone:", err);
    throw err;
  }
};

export const deleteTodo = async (todoId: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/delete/${todoId}`, {
      method: "DELETE",
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("❌ Error while deleting todo:", err);
    throw err;
  }
};

export const editTodo = async (id: string, text: string) => {
  const res = await fetch(`${BACKEND_URL}/edit/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  return await res.json();
};

export const deleteMultipleTodos = async (ids: String []) => {
  const response = await fetch(`${BACKEND_URL}/delete-multiple`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  });
  if (!response.ok) throw new Error('Failed to delete multiple');
  return response.json();
};