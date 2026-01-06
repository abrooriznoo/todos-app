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
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getTodos(search);
      setTodos(res.data.data);
    } catch {
      setError("Gagal memuat data todo");
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title) => {
    if (!title.trim()) {
      toast.warning("Judul todo tidak boleh kosong");
      return false;
    }

    try {
      await createTodo(title);
      toast.success("Todo berhasil ditambahkan");
      fetchTodos();
      return true;
    } catch {
      toast.error("Gagal menambahkan todo");
      return false;
    }
  };

  const update = async (id, title) => {
    if (!title.trim()) {
      toast.warning("Judul tidak boleh kosong");
      return false;
    }

    try {
      await updateTodo(id, title);
      toast.success("Todo berhasil diperbarui");
      fetchTodos();
      return true;
    } catch {
      toast.error("Gagal memperbarui todo");
      return false;
    }
  };

  const remove = async (id) => {
    try {
      await deleteTodo(id);
      toast.success("Todo berhasil dihapus");
      fetchTodos();
    } catch {
      toast.error("Gagal menghapus todo");
    }
  };

  const toggle = async (id) => {
    try {
      await toggleTodo(id);
      fetchTodos();
    } catch {
      toast.error("Gagal mengubah status todo");
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
    setSearch,
    addTodo,
    toggle,
    update,
    remove,
  };
}
