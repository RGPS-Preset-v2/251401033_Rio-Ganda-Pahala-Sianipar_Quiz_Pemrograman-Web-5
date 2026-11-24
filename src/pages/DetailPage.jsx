import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TodoModal from "../components/TodoModal";

export default function DetailPage({ todos, onUpdateTodo }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const todo = todos.find((item) => String(item.id) === String(id));

  if (!todo) {
    return (
      <div className="detail-wrapper">
        <div style={{ textAlign: "center" }}>
          <h2 style={{ marginBottom: "12px" }}>Tugas tidak ditemukan</h2>
          <button className="btn btn-red" onClick={() => navigate("/")}>Kembali</button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-wrapper">
      <div className="detail-card">
        <div className="detail-left">
          <div className="detail-field">
            <div className="detail-label">Judul</div>
            <div className="detail-value">{todo.title}</div>
          </div>
          <div className="detail-field">
            <div className="detail-label">Deskripsi</div>
            <div className="detail-desc-box">{todo.description || "Tidak ada deskripsi."}</div>
          </div>
        </div>
        <div className="detail-right">
          <div>
            <div className="detail-field">
              <div className="detail-label">Status</div>
              <div className="detail-value">{todo.status}</div>
            </div>
            <div className="detail-field">
              <div className="detail-label">Prioritas</div>
              <div className="detail-value">{todo.priority}</div>
            </div>
            <div className="detail-field">
              <div className="detail-label">Deadline</div>
              <div className="detail-value" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {todo.deadline}
              </div>
            </div>
          </div>
          <div className="detail-buttons">
            <button className="btn btn-red" onClick={() => navigate("/")}>Kembali</button>
            <button className="btn btn-blue" onClick={() => setIsUpdateOpen(true)}>Update</button>
          </div>
        </div>
      </div>
      <TodoModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        onSubmit={onUpdateTodo}
        initialData={todo}
      />
    </div>
  );
}
