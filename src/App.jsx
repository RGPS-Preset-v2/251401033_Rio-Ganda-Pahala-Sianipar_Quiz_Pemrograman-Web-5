import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initialTodos } from "./data/dummyTodos";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";

export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleAddTodo = (newTodoData) => {
    const nextId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
    setTodos((prev) => [{ id: nextId, ...newTodoData }, ...prev]);
    showToast("Tugas berhasil ditambahkan!");
  };

  const handleUpdateTodo = (updatedTodo) => {
    setTodos((prev) => prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
    showToast("Tugas berhasil diperbarui!");
  };

  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    showToast("Tugas berhasil dihapus!");
  };

  return (
    <BrowserRouter>
      {toastMessage && <div className="toast">{toastMessage}</div>}
      <Routes>
        <Route path="/" element={<HomePage todos={todos} onAddTodo={handleAddTodo} onDeleteTodo={handleDeleteTodo} />} />
        <Route path="/todo/:id" element={<DetailPage todos={todos} onUpdateTodo={handleUpdateTodo} />} />
      </Routes>
    </BrowserRouter>
  );
}
