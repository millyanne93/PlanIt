import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import EditTaskModal from './EditTaskModal';

export default function TaskManager() {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  const API_URL = "http://localhost:5000/tasks";

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();
      console.log("Fetched tasks:", data); 
      data.forEach((task, index) => {
        console.log(`Task ${index} _id:`, task._id, "Type:", typeof task._id); // Add this debug
      });
      setTasks(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const handleAddTask = async (newTask) => {
    console.log("New task received from backend:", newTask); // Add this debug
    console.log("New task _id:", newTask._id, "Type:", typeof newTask._id); // Add this debug
    setTasks(prev => [...prev, newTask]);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const res = await fetch(`${API_URL}/${updatedTask._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedTask)
      });

      if (!res.ok) throw new Error(`Failed to update: ${res.status}`);
      const savedTask = await res.json();

      setTasks(prev => prev.map(task => task._id === savedTask._id ? savedTask : task));
      setEditTask(null);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      console.log("Deleting task withID:", id);

      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      console.log("Delete response status:", res.status);

      if (!res.ok) {
        throw new Error(`Failed to delete: ${res.status}`);
      }

      console.log("Delete successful, updating state");
      setTasks(prev => {
        const newTasks = prev.filter(task => task._id !== id);
        console.log("Tasks after delete:", newTasks);
        return newTasks;
      });
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-pink-100 to-pink-300 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-pink-800">Task Manager</h2>

      <TaskForm onAddTask={handleAddTask} />

      <TaskList
        tasks={tasks}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />

      {editTask && (
        <EditTaskModal
          task={editTask}
          onClose={() => setEditTask(null)}
          onUpdateTask={handleUpdateTask}
        />
      )}
    </div>
  );
}
