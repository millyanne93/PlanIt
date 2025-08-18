import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function TaskForm({ onAddTask }) {
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "Pending",        // ✅ Added status field
    priority: "Medium",       // ✅ Added priority field
    reminder: "",
    shared_with: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Submitting task:", form);

      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`Failed to create task: ${response.status}`);
      }

      const data = await response.json();
      console.log("Task created successfully:", data);

      onAddTask(data);
      setForm({
        title: "",
        description: "",
        due_date: "",
        status: "Pending",      // ✅ Reset to default
        priority: "Medium",     // ✅ Reset to default
        reminder: "",
        shared_with: ""
      });

    } catch (err) {
      console.error("Error creating task:", err);
      alert("Failed to create task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white p-6 rounded-xl shadow-lg space-y-4 mb-6"
    >
      <h2 className="text-xl font-bold">Add New Task</h2>

      {/* Title Field */}
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Task Title"
        className="w-full p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
        required
        disabled={isSubmitting}
      />

      {/* Description Field */}
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Task Description"
        className="w-full p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
        rows="3"
        disabled={isSubmitting}
      />

      {/* Due Date Field */}
      <div>
        <label className="block text-sm font-medium mb-1">Due Date</label>
        <input
          type="date"
          name="due_date"
          value={form.due_date}
          onChange={handleChange}
          className="w-full p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
          disabled={isSubmitting}
        />
      </div>

      {/* Status and Priority in a row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Status Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
            disabled={isSubmitting}
          >
            <option value="Pending">📋 Pending</option>
            <option value="In Progress">⚡ In Progress</option>
            <option value="Completed">✅ Completed</option>
          </select>
        </div>

        {/* Priority Field */}
        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
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
        <label className="block text-sm font-medium mb-1">Reminder (Optional)</label>
        <input
          type="datetime-local"
          name="reminder"
          value={form.reminder}
          onChange={handleChange}
          className="w-full p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
          disabled={isSubmitting}
        />
      </div>

      {/* Share With Field */}
      <div>
        <label className="block text-sm font-medium mb-1">Share With (Optional)</label>
        <input
          type="text"
          name="shared_with"
          value={form.shared_with}
          onChange={handleChange}
          placeholder="Enter email addresses separated by commas"
          className="w-full p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
          disabled={isSubmitting}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-white text-pink-600 font-bold px-6 py-3 rounded hover:bg-pink-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding Task..." : "🎯 Add Task"}
      </button>
    </form>
  );
}
