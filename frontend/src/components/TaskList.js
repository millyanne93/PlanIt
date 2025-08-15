import React, { useState, useContext } from "react";
import EditTaskModal from "./EditTaskModal";
import { AuthContext } from "../context/AuthContext";

export default function TaskList({ tasks, onUpdateTask, onDeleteTask }) {
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTasks, setDeletingTasks] = useState(new Set());

  const handleDelete = async (taskId) => {
    // Prevent duplicate deletions
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

  return (
    <div className="grid gap-4">
      {tasks.map((task, index) => {
        const taskKey = task._id || `task-${index}`;
        
        return (
          <div
            key={taskKey}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-start"
          >
            <div>
              <h3 className="text-lg font-bold">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              {task.due_date && (
                <p className="text-sm text-gray-500">
                  Due: {new Date(task.due_date).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => setEditingTask(task)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => {
                  if (!task._id) {
                    console.error("Cannot delete task without ID:", task);
                    alert("Cannot delete this task. Please refresh the page.");
                    return;
                  }
                  handleDelete(task._id);
                }}
                disabled={!task._id || deletingTasks.has(task._id)}
              >
                {deletingTasks.has(task._id) ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        );
      })}

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
