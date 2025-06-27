import { useState, useEffect } from "react";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface UseTodosResult {
  todos: Todo[];
  loading: boolean;
  error: string;
  addTodo: (title: string) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
}

const API_URL = "http://localhost:3000/todos";

export const useTodos = (
  searchTerm: string,
  sortAlphabetically: boolean
): UseTodosResult => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const url = new URL(API_URL);
      if (searchTerm.trim() !== "") {
        url.searchParams.append("title_like", searchTerm);
      }
      if (sortAlphabetically) {
        url.searchParams.append("_sort", "title");
        url.searchParams.append("_order", "asc");
      }
      const res = await fetch(url.toString());
      if (!res.ok) {
        throw new Error("Ошибка при загрузке данных");
      }
      const data = await res.json();
      setTodos(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Неизвестная ошибка");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, sortAlphabetically]);

  const addTodo = async (title: string) => {
    try {
      const newTodo = { title, completed: false };
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      if (!res.ok) {
        throw new Error("Ошибка при добавлении дела");
      }
      fetchTodos();
    } catch (error: unknown) {
      console.error("Error adding todo", error);
    }
  };

  const updateTodo = async (updatedTodo: Todo) => {
    try {
      const res = await fetch(`${API_URL}/${updatedTodo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      if (!res.ok) {
        throw new Error("Ошибка при обновлении дела");
      }
      fetchTodos();
    } catch (error: unknown) {
      console.error("Error updating todo", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Ошибка при удалении дела");
      }
      fetchTodos();
    } catch (error: unknown) {
      console.error("Error deleting todo", error);
    }
  };

  return { todos, loading, error, addTodo, updateTodo, deleteTodo };
};
