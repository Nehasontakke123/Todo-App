import React, { useState, useEffect } from 'react';
import './index.css';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = () => {
    if (task.trim() === '') return;
    if (editId !== null) {
      const updated = tasks.map((t) => (t.id === editId ? { ...t, text: task } : t));
      setTasks(updated);
      setEditId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
    }
    setTask('');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleComplete = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleEdit = (id, text) => {
    setTask(text);
    setEditId(id);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'completed') return t.completed;
    if (filter === 'pending') return !t.completed;
    return true;
  });

  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center px-4">
    <div className="w-full max-w-2xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">🌟 Todo List</h1>

      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task..."
          className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
        />
        <button
          onClick={handleAdd}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2 rounded-lg hover:scale-105 transition-transform duration-200"
        >
          {editId !== null ? 'Update' : 'Add'}
        </button>
      </div>

      <div className="flex justify-center gap-4 mb-4 text-sm font-medium">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full ${
            filter === 'all' ? 'bg-indigo-600 text-white' : 'text-indigo-700 hover:underline'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 rounded-full ${
            filter === 'completed' ? 'bg-green-500 text-white' : 'text-green-700 hover:underline'
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-3 py-1 rounded-full ${
            filter === 'pending' ? 'bg-yellow-400 text-white' : 'text-yellow-700 hover:underline'
          }`}
        >
          Pending
        </button>
      </div>

      <ul className="divide-y">
        {filteredTasks.map((t) => (
          <li
            key={t.id}
            className="flex justify-between items-center py-3 hover:bg-white/50 px-2 rounded transition duration-150"
          >
            <span
              onClick={() => handleComplete(t.id)}
              className={`flex-1 cursor-pointer text-lg ${
                t.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}
            >
              {t.text}
            </span>
            <div className="flex gap-3 text-sm">
              <button
                onClick={() => handleEdit(t.id, t.text)}
                className="text-indigo-500 hover:underline"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                className="text-red-500 hover:underline"
              >
                🗑 Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}