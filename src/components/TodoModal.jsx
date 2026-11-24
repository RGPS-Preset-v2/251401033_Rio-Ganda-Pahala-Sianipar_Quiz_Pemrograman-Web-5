import { useState, useEffect } from "react";

export default function TodoModal({ isOpen, onClose, onSubmit, initialData = null }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("to-do");
  const [priority, setPriority] = useState("low");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setStatus(initialData.status || "to-do");
      setPriority(initialData.priority || "low");
      setDeadline(initialData.deadline || "");
    } else {
      setTitle("");
      setDescription("");
      setStatus("to-do");
      setPriority("low");
      setDeadline("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;
  const isEdit = Boolean(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !deadline) {
      alert("Judul dan Deadline wajib diisi!");
      return;
    }
    onSubmit({
      ...(initialData ? { id: initialData.id } : {}),
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      deadline,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{isEdit ? "Update Todo" : "Tambah Todo"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Judul</label>
            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Deskripsi</label>
            <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="to-do">to-do</option>
                <option value="in progress">in progress</option>
                <option value="done">done</option>
              </select>
            </div>
            <div className="form-group">
              <label>Prioritas</label>
              <select className="form-control" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Deadline</label>
            <input type="date" className="form-control" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-red" onClick={onClose}>Batal</button>
            <button type="submit" className="btn btn-blue">{isEdit ? "Update" : "Tambah"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
