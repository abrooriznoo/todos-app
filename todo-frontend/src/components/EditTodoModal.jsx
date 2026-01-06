import { Modal, Input } from "antd";
import { useEffect, useState } from "react";

export default function EditTodoModal({ open, todo, onCancel, onSubmit }) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(todo?.title || "");
  }, [todo]);

  return (
    <Modal
      open={open}
      title="Edit Todo"
      okText="Simpan"
      onCancel={onCancel}
      onOk={() => onSubmit(title)}
    >
      <Input
        placeholder="Judul todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </Modal>
  );
}
