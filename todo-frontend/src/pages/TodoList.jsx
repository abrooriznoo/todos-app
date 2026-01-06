import { useState } from "react";
import { Table, Checkbox, Input, Button, Spin, Alert, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTodos } from "../hooks/useTodos";
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
  } = useTodos();

  const [title, setTitle] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

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
              className="sm:w-28"
              onClick={async () => {
                const ok = await addTodo(title);
                if (ok) setTitle("");
              }}
            >
              Add
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="space-y-4 grid grid-col-2 sm:space-y-0 sm:flex sm:justify-end sm:items-center mb-4 gap-4">
          <div className="max-w-sm grid-cols-1">
            <Input
              placeholder="Cari todo..."
              allowClear
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="grid-cols-1">
            <Button
              onClick={() => setSearch("")}
              className="rounded-lg border border-slate-300 text-slate-600 hover:text-slate-800 hover:border-slate-400"
            >
              Reset
            </Button>
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
