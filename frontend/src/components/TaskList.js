import React, { useState, useContext } from "react";
import EditTaskModal from "./EditTaskModal";
import { AuthContext } from "../context/AuthContext";

export default function TaskList({ tasks, onUpdateTask, onDeleteTask }) {
  const { token } = useContext(AuthContext);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTasks, setDeletingTasks] = useState(new Set());
  const [completingTasks, setCompletingTasks] = useState(new Set()); // ✅ New state

  // Helper function to format date properly
  const formatDate = (dateValue) => {
    if (!dateValue) return null;

    try {
      let date;

      // Handle different date formats
      if (typeof dateValue === 'string') {
        // Handle ISO string format from backend
        date = new Date(dateValue);
      } else if (dateValue.$date) {
        // Handle MongoDB date format: {"$date": "2025-08-16T00:00:00.000Z"}
        date = new Date(dateValue.$date);
      } else if (typeof dateValue === 'object' && dateValue.getTime) {
        // Already a Date object
        date = dateValue;
      } else {
        // Try to create date from value
        date = new Date(dateValue);
      }

      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.warn("Invalid date value:", dateValue);
        return "Invalid Date";
      }

      return date.toLocaleDateString();
    } catch (error) {
      console.error("Error formatting date:", error, "Value:", dateValue);
      return "Invalid Date";
    }
  };

  // Helper function to check if task is overdue
  const isOverdue = (dateValue) => {
    if (!dateValue) return false;

    try {
      const dueDate = new Date(dateValue);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to start of day

      return dueDate < today;
    } catch (error) {
      return false;
    }
  };

  // ✅ Helper function to get status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // ✅ Helper function to get priority styling
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // ✅ Fixed function to handle quick completion
  const handleMarkComplete = async (taskId) => {
    if (completingTasks.has(taskId)) return;

    setCompletingTasks(prev => new Set([...prev, taskId]));

    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}/complete`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Complete task error:", response.status, errorText);
        throw new Error(`Failed to complete task: ${response.status}`);
      }
      
      const updatedTask = await response.json();
      console.log("Task completed successfully:", updatedTask);
      
      // ✅ Update the task in the parent component's state
      onUpdateTask(updatedTask);
      
    } catch (err) {
      console.error("Error completing task:", err);
      alert("Failed to mark task as complete. Please try again.");
    } finally {
      setCompletingTasks(prev => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });
    }
  };

  const handleDelete = async (taskId) => {
    if (deletingTasks.has(taskId)) return;

    setDeletingTasks(prev => new Set([...prev, taskId]));

    try {
      await onDeleteTask(taskId);
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setDeletingTasks(prev => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });
    }
  };

  // ✅ Helper to get task ID
  const getTaskId = (task) => {
    if (typeof task._id === "string") return task._id;
    if (typeof task._id === "object" && task._id.$oid) return task._id.$oid;
    return task._id;
  };

  return (
    <div className="grid gap-4">
      {tasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">No tasks yet! 📝</p>
          <p className="text-sm">Create your first task above to get started.</p>
        </div>
      ) : (
        tasks.map((task, index) => {
          const taskKey = task._id || `task-${index}`;
          const taskId = getTaskId(task);
          const formattedDueDate = formatDate(task.due_date);
          const taskIsOverdue = isOverdue(task.due_date) && task.status !== 'Completed';

          return (
            <div
              key={taskKey}
              className={`bg-white p-4 rounded-xl shadow-md border-l-4 transition-all duration-200 hover:shadow-lg ${
                task.status === 'Completed' 
                  ? 'border-green-400 bg-green-50 opacity-75' 
                  : taskIsOverdue 
                    ? 'border-red-400 bg-red-50' 
                    : 'border-pink-400'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`text-lg font-bold ${
                      task.status === 'Completed' ? 'text-gray-600 line-through' : 'text-gray-800'
                    }`}>
                      {task.title}
                    </h3>
                    
                    {/* ✅ Enhanced status badge */}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyle(task.status)}`}>
                      {task.status === 'Completed' && '✅ '}
                      {task.status === 'In Progress' && '⚡ '}
                      {task.status === 'Pending' && '📋 '}
                      {task.status || 'Pending'}
                    </span>
                  </div>

                  {task.description && (
                    <p className={`text-sm mb-2 ${
                      task.status === 'Completed' ? 'text-gray-500' : 'text-gray-600'
                    }`}>
                      {task.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 text-xs">
                    {task.due_date && (
                      <span className={`flex items-center gap-1 px-2 py-1 rounded border ${
                        taskIsOverdue
                          ? 'bg-red-100 text-red-700 border-red-200'
                          : task.status === 'Completed'
                            ? 'bg-gray-100 text-gray-600 border-gray-200'
                            : 'bg-blue-100 text-blue-700 border-blue-200'
                      }`}>
                        📅 Due: {formattedDueDate}
                        {taskIsOverdue && <span className="font-semibold">(Overdue!)</span>}
                      </span>
                    )}

                    {/* ✅ Enhanced priority badge */}
                    {task.priority && (
                      <span className={`px-2 py-1 rounded border text-xs font-medium ${getPriorityStyle(task.priority)}`}>
                        {task.priority === 'High' && '🔴 '}
                        {task.priority === 'Medium' && '🟡 '}
                        {task.priority === 'Low' && '🟢 '}
                        {task.priority} Priority
                      </span>
                    )}

                    {task.reminder && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 border border-purple-200 rounded">
                        🔔 Reminder Set
                      </span>
                    )}

                    {task.shared_with && (
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 border border-indigo-200 rounded">
                        👥 Shared
                      </span>
                    )}
                  </div>
                </div>

                {/* ✅ Enhanced action buttons */}
                <div className="flex gap-2 ml-4">
                  {/* Quick Complete Button - only show if not completed */}
                  {task.status !== 'Completed' && (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors duration-200 text-sm font-medium disabled:opacity-50"
                      onClick={() => handleMarkComplete(taskId)}
                      disabled={!taskId || completingTasks.has(taskId)}
                      title="Mark as completed"
                    >
                      {completingTasks.has(taskId) ? "✓..." : "✓"}
                    </button>
                  )}
                  
                  {/* Edit Button */}
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
                    onClick={() => setEditingTask(task)}
                    title="Edit task"
                  >
                    ✏️
                  </button>
                  
                  {/* Delete Button */}
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-200 text-sm font-medium disabled:opacity-50"
                    onClick={() => {
                      if (!taskId) {
                        console.error("Cannot delete task without ID:", task);
                        alert("Cannot delete this task. Please refresh the page.");
                        return;
                      }
                      if (window.confirm("Are you sure you want to delete this task?")) {
                        handleDelete(taskId);
                      }
                    }}
                    disabled={!taskId || deletingTasks.has(taskId)}
                    title="Delete task"
                  >
                    {deletingTasks.has(taskId) ? "🗑️..." : "🗑️"}
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onUpdateTask={onUpdateTask}
        />
      )}
    </div>
  );
}
