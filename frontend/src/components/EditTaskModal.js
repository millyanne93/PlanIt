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
    title: task.title || "",
    description: task.description || "",
    due_date: task.due_date ? task.due_date.slice(0, 10) : "",
    status: task.status || "Pending",       // ✅ Added status field
    priority: task.priority || "Medium",    // ✅ Added priority field
    reminder: task.reminder || "",
    shared_with: task.shared_with || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Updating task with ID:", taskId);

      // Convert form data to match backend expectations
      const updateData = {
        title: form.title,
        description: form.description,
        due_date: form.due_date,
        status: form.status,
        priority: form.priority,
      };

      // Only include optional fields if they have values
      if (form.reminder) {
        updateData.reminder = form.reminder;
      }
      if (form.shared_with) {
        updateData.shared_with = form.shared_with;
      }

      const res = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) {
        throw new Error(`Failed to update: ${res.status}`);
      }

      const data = await res.json();
      console.log("Task updated successfully:", data);

      // Call the parent component's update handler
      onUpdateTask({ ...task, ...updateData, _id: taskId });
      onClose();
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Edit Task</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Title *
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter task title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter task description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              rows="3"
              disabled={isSubmitting}
            />
          </div>

          {/* Due Date Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              name="due_date"
              value={form.due_date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              disabled={isSubmitting}
            />
          </div>

          {/* Status and Priority Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                disabled={isSubmitting}
              >
                <option value="Pending">📋 Pending</option>
                <option value="In Progress">⚡ In Progress</option>
                <option value="Completed">✅ Completed</option>
              </select>
            </div>

            {/* Priority Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                disabled={isSubmitting}
              >
                <option value="Low">🟢 Low Priority</option>
                <option value="Medium">🟡 Medium Priority</option>
                <option value="High">🔴 High Priority</option>
              </select>
            </div>
          </div>

          {/* Reminder Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reminder (Optional)
            </label>
            <input
              type="datetime-local"
              name="reminder"
              value={form.reminder}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              disabled={isSubmitting}
            />
          </div>

          {/* Share With Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Share With (Optional)
            </label>
            <input
              type="text"
              name="shared_with"
              placeholder="Enter email addresses separated by commas"
              value={form.shared_with}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              disabled={isSubmitting}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "💾 Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
