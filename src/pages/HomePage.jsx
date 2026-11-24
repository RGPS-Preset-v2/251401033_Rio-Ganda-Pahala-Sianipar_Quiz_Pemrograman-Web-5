import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Trash2, Plus, Sparkles } from "lucide-react";
import TodoModal from "../components/TodoModal";

export default function HomePage({ todos, onAddTodo, onDeleteTodo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDelete = (todo) => {
    if (window.confirm(`Konfirmasi: Hapus misi "${todo.title}" dari daftar?`)) {
      onDeleteTodo(todo.id);
    }
  };

  const getStatusBadge = (status) => {
    if (status === "done") return "badge badge-status-done";
    if (status === "in progress") return "badge badge-status-progress";
    return "badge badge-status-todo";
  };

  const getPriorityBadge = (priority) => {
    if (priority === "high") return "badge badge-prio-high";
    if (priority === "medium") return "badge badge-prio-medium";
    return "badge badge-prio-low";
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header-title-group">
          <span className="header-tag">// SCHALE TACTICAL QUEST LOG</span>
          <h1>Todo List</h1>
        </div>
        <button className="btn btn-blue" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Tambah Todo
        </button>
      </div>

      <div className="table-wrapper">
        <table className="todo-table">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Status</th>
              <th>Prioritas</th>
              <th>Deadline</th>
              <th className="th-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {todos.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "36px", color: "#64748b" }}>
                  <Sparkles size={20} style={{ verticalAlign: "middle", marginRight: "8px" }} />
                  Semua misi selesai! Klik "Tambah Todo" untuk menambah tugas baru.
                </td>
              </tr>
            ) : (
              todos.map((todo) => (
                <tr key={todo.id}>
                  <td className="title-cell" title={todo.title}>{todo.title}</td>
                  <td>
                    <span className={getStatusBadge(todo.status)}>{todo.status}</span>
                  </td>
                  <td>
                    <span className={getPriorityBadge(todo.priority)}>{todo.priority}</span>
                  </td>
                  <td className="deadline-cell">{todo.deadline}</td>
                  <td>
                    <div className="action-cell">
                      <button
                        className="btn-icon btn-blue"
                        title="Lihat Detail"
                        onClick={() => navigate(`/todo/${todo.id}`)}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="btn-icon btn-red"
                        title="Hapus Tugas"
                        onClick={() => handleDelete(todo)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <TodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onAddTodo}
      />
    </div>
  );
}
