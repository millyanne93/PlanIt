import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function TaskForm({ onAddTask }) {
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",        // ✅ Changed to snake_case
    reminder: "",
    shared_with: "",     // ✅ Changed to snake_case
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
      
      const response = await fetch("http://localhost:5000/tasks", { // ✅ Fixed URL
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
        due_date: "",      // ✅ Changed to snake_case
        reminder: "", 
        shared_with: ""    // ✅ Changed to snake_case
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
      <h2 className="text-xl font-bold">Add Task</h2>
      
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
      
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Task Description"
        className="w-full p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
        rows="3"
        disabled={isSubmitting}
      />
      
      <input
        type="date"
        name="due_date"      // ✅ Changed to snake_case
        value={form.due_date}
        onChange={handleChange}
        className="w-full p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
        disabled={isSubmitting}
      />
      
      <input
        type="datetime-local"
        name="reminder"
        value={form.reminder}
        onChange={handleChange}
        className="w-full p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
        disabled={isSubmitting}
      />
      
      <input
        type="text"
        name="shared_with"   // ✅ Changed to snake_case
        value={form.shared_with}
        onChange={handleChange}
        placeholder="Share with (emails separated by commas)"
        className="w-full p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
        disabled={isSubmitting}
      />
      
      <button
        type="submit"
        className="bg-white text-pink-600 font-bold px-6 py-3 rounded hover:bg-pink-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}
