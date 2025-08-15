import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function EditTaskModal({ task, onClose, onUpdateTask }) {
  const { token } = useContext(AuthContext);

  // Helper to get actual task ID (same as in TaskList)
  const getTaskId = (task) => {
    // Case 1: Backend conversion worked - _id is already a string
    if (typeof task._id === "string") {
        return task._id;  // "689f162658aac8bb9d3d45d9"
    }
    
    // Case 2: Backend conversion failed - _id is still an object
    if (typeof task._id === "object" && task._id.$oid) {
        return task._id.$oid;  // Extract from {"$oid": "689f162658aac8bb9d3d45d9"}
    }
    
    return task._id;  // Fallback
  };

  const taskId = getTaskId(task);

  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.due_date ? task.due_date.slice(0, 10) : "",
    reminder: task.reminder || "",
    sharedWith: task.sharedWith || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log("Updating task with ID:", taskId);
      
      const res = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(`Failed to update: ${res.status}`);
      }

      const data = await res.json();
      console.log("Task updated successfully:", data);
      
      onUpdateTask(data);
      onClose();
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update task. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            required
          />
          <textarea
            name="description"
            placeholder="Task description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            rows="3"
          />
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full p-2 rounded border"
          />
          <input
            type="datetime-local"
            name="reminder"
            value={form.reminder}
            onChange={handleChange}
            className="w-full p-2 rounded border"
          />
          <input
            type="text"
            name="sharedWith"
            placeholder="Share with (email)"
            value={form.sharedWith}
            onChange={handleChange}
            className="w-full p-2 rounded border"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
