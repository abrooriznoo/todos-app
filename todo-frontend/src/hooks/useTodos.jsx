import { useEffect, useState } from "react";
import { toast } from "../utils/toast";
import {
  getTodos,
  createTodo,
  toggleTodo,
  updateTodo,
  deleteTodo,
} from "../utils/api";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getTodos(search);
      setTodos(res.data.data);
    } catch {
      setError("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title) => {
    if (!title.trim()) {
      toast.warning("Please insert the Todos!");
      return false;
    }

    try {
      const res = await createTodo(title);
      toast.success(res.data.message);
      fetchTodos();
      return true;
    } catch (err) {
      toast.error(err.data?.message || "Failed to add todo");
      return false;
    }
  };

  const update = async (id, title) => {
    if (!title.trim()) {
      toast.warning("Please insert the Todos!");
      return false;
    }

    try {
      const res = await updateTodo(id, title);
      toast.success(res.data.message);
      fetchTodos();
      return true;
    } catch (err) {
      toast.error(err.data?.message || "Failed to update todo");
      return false;
    }
  };

  const remove = async (id) => {
    try {
      const res = await deleteTodo(id);
      toast.success(res.data.message);
      fetchTodos();
    } catch (err) {
      toast.error(err.data?.message || "Failed to delete todo");
    }
  };

  const toggle = async (id) => {
    try {
      const res = await toggleTodo(id);
      fetchTodos();

      if (res.data.data.completed === true) {
        setConfetti(true);
        toast.success("Todos Completed! 🎉");
        setTimeout(() => setConfetti(false), 10000); // 10 detik
      } else {
        setConfetti(false);
      }
    } catch (err) {
      if (err.data || err.message) {
        toast.error(err.message);
      } else {
        toast.error("Gagal mengubah status todo");
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [search]);

  return {
    todos,
    loading,
    error,
    search,
    confetti,
    setSearch,
    addTodo,
    toggle,
    update,
    remove,
  };
}
