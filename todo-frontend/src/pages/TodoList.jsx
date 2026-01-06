import { useState } from "react";
import { Table, Checkbox, Input, Button, Spin, Alert, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { useTodos } from "../hooks/useTodos";
import Confetti from "react-confetti";
import EditTodoModal from "../components/EditTodoModal";

export default function TodoList() {
  const {
    todos,
    loading,
    error,
    search,
    setSearch,
    addTodo,
    toggle,
    update,
    remove,
    confetti,
  } = useTodos();

  const [title, setTitle] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const columns = [
    {
      title: "#",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (text, record) => (
        <span
          className={
            record.completed ? "line-through text-slate-400" : "text-slate-700"
          }
        >
          {text}
        </span>
      ),
    },
    {
      title: "Completed",
      width: 120,
      align: "center",
      render: (_, record) => (
        <Checkbox
          checked={record.completed}
          onChange={() => toggle(record.id)}
        />
      ),
    },
    {
      title: "Actions",
      width: 120,
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center gap-2">
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => setEditingTodo(record)}
          />
          <Popconfirm
            title="Hapus todo ini?"
            description="Tindakan ini tidak dapat dibatalkan"
            onConfirm={() => remove(record.id)}
          >
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      {confetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false} // tampil sekali
          numberOfPieces={200} // opsional, lebih ramai
        />
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-800">
            Todo Management
          </h1>
          <p className="text-sm text-slate-500">
            Kelola daftar tugas harian Anda!
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          {/* Add Todo */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              size="large"
              placeholder="Tambahkan todo baru"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onPressEnter={async () => {
                const ok = await addTodo(title);
                if (ok) setTitle("");
              }}
            />
            <Button
              size="large"
              type="primary"
              onClick={async () => {
                const ok = await addTodo(title);
                if (ok) setTitle("");
              }}
            >
              <PlusOutlined />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="flex flex-col mb-4">
          {/* Tombol Toggle Filter - Hanya muncul di Mobile */}
          <div className="sm:hidden flex justify-end mb-2">
            <Button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="rounded-lg flex items-center gap-2"
            >
              <FilterOutlined />
            </Button>
          </div>

          {/* Container Search & Reset */}
          <div
            className={`
              ${isFilterOpen ? "flex" : "hidden"} 
              sm:flex flex-row items-center justify-end gap-2 w-full
            `}
          >
            {/* Input Search */}
            <div className="flex-1 sm:max-w-sm">
              <Input
                placeholder="Cari todo..."
                allowClear
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-lg w-full"
              />
            </div>

            {/* Tombol Reset */}
            <div className="flex-shrink-0">
              <Button
                onClick={() => {
                  setSearch("");
                  setIsFilterOpen(false); // Opsional: tutup setelah reset
                }}
                className="rounded-lg border border-slate-300 text-slate-600"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>

        {error && (
          <Alert type="error" message={error} className="mb-4" showIcon />
        )}

        <div className="bg-white rounded-xl border border-slate-200">
          {loading ? (
            <div className="py-12 flex justify-center">
              <Spin />
            </div>
          ) : (
            <Table
              rowKey="id"
              columns={columns}
              dataSource={todos}
              pagination={false}
            />
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <EditTodoModal
        open={!!editingTodo}
        todo={editingTodo}
        onCancel={() => setEditingTodo(null)}
        onSubmit={async (title) => {
          await update(editingTodo.id, title);
          setEditingTodo(null);
        }}
      />
    </div>
  );
}
