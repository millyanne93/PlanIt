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
        console.log(`Task ${index} _id:`, task._id, "Type:", typeof task._id);
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
    console.log("New task received from backend:", newTask);
    console.log("New task _id:", newTask._id, "Type:", typeof newTask._id);
    setTasks(prev => [...prev, newTask]);
  };

  // ✅ NEW: For handling updates from the EditTaskModal (makes API call)
  const handleUpdateTaskFromModal = async (updatedTask) => {
    try {
      // Get the proper task ID
      const taskId = typeof updatedTask._id === 'string' 
        ? updatedTask._id 
        : updatedTask._id?.$oid || updatedTask._id;

      console.log("Updating task via modal with ID:", taskId);

      const res = await fetch(`${API_URL}/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title: updatedTask.title,
          description: updatedTask.description,
          due_date: updatedTask.due_date || updatedTask.dueDate, // Handle both formats
          status: updatedTask.status,
          priority: updatedTask.priority,
          reminder: updatedTask.reminder,
          shared_with: updatedTask.shared_with
        })
      });

      if (!res.ok) throw new Error(`Failed to update: ${res.status}`);
      
      const savedTask = await res.json();
      console.log("Task updated via modal:", savedTask);
      
      // Update the local state
      setTasks(prev => prev.map(task => {
        const currentTaskId = typeof task._id === 'string' ? task._id : task._id?.$oid;
        const savedTaskId = typeof savedTask._id === 'string' ? savedTask._id : savedTask._id?.$oid;
        return currentTaskId === savedTaskId ? savedTask : task;
      }));
      
      setEditTask(null);
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update task. Please try again.");
    }
  };

  // ✅ NEW: For handling updates from quick actions like "Complete" (NO API call - just updates state)
  const handleUpdateTaskFromAction = (updatedTask) => {
    console.log("Updating task in state from action:", updatedTask);
    
    setTasks(prev => prev.map(task => {
      const currentTaskId = typeof task._id === 'string' ? task._id : task._id?.$oid;
      const updatedTaskId = typeof updatedTask._id === 'string' ? updatedTask._id : updatedTask._id?.$oid;
      
      return currentTaskId === updatedTaskId ? updatedTask : task;
    }));
  };

  const handleDeleteTask = async (id) => {
    try {
      console.log("Deleting task with ID:", id);

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
        const newTasks = prev.filter(task => {
          const taskId = typeof task._id === 'string' ? task._id : task._id?.$oid;
          return taskId !== id;
        });
        console.log("Tasks after delete:", newTasks);
        return newTasks;
      });
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete task. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-pink-100 to-pink-300 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-pink-800">Task Manager</h2>

      <TaskForm onAddTask={handleAddTask} />

      <TaskList
        tasks={tasks}
        onUpdateTask={handleUpdateTaskFromAction}  {/* ✅ Use the state-only handler */}
        onDeleteTask={handleDeleteTask}
      />

      {editTask && (
        <EditTaskModal
          task={editTask}
          onClose={() => setEditTask(null)}
          onUpdateTask={handleUpdateTaskFromModal}  {/* ✅ Use the API handler */}
        />
      )}
    </div>
  );
}
