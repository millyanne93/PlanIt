// src/pages/Dashboard.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import EditTaskModal from '../components/EditTaskModal';

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks' or 'add'
  const [editTask, setEditTask] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    overdue: 0
  });

  const API_URL = "http://localhost:5000/tasks";

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();
      setTasks(data);
      calculateStats(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const calculateStats = (taskList) => {
    const now = new Date();
    const stats = taskList.reduce((acc, task) => {
      acc.total++;
      if (task.status === 'Completed') {
        acc.completed++;
      } else {
        acc.pending++;
        if (task.due_date && new Date(task.due_date) < now) {
          acc.overdue++;
        }
      }
      return acc;
    }, { total: 0, pending: 0, completed: 0, overdue: 0 });
    
    setStats(stats);
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const handleAddTask = async (newTask) => {
    setTasks(prev => {
      const updated = [...prev, newTask];
      calculateStats(updated);
      return updated;
    });
    setActiveTab('tasks'); // Switch to tasks view after adding
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
      
      setTasks(prev => {
        const updated = prev.map(task => task._id === savedTask._id ? savedTask : task);
        calculateStats(updated);
        return updated;
      });
      setEditTask(null);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(`Failed to delete: ${res.status}`);
      
      setTasks(prev => {
        const updated = prev.filter(task => task._id !== id);
        calculateStats(updated);
        return updated;
      });
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const StatCard = ({ title, value, color, icon }) => (
    <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${color} transform hover:scale-105 transition-transform duration-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-700">{value}</p>
        </div>
        <div className={`text-3xl ${icon}`}>
          {title === 'Total Tasks' && '📝'}
          {title === 'Pending' && '⏳'}
          {title === 'Completed' && '✅'}
          {title === 'Overdue' && '🚨'}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Task Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Manage your tasks efficiently and stay organized</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Welcome back!</p>
              <p className="font-semibold text-gray-700">Ready to be productive?</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Tasks" 
            value={stats.total} 
            color="border-blue-500"
          />
          <StatCard 
            title="Pending" 
            value={stats.pending} 
            color="border-yellow-500"
          />
          <StatCard 
            title="Completed" 
            value={stats.completed} 
            color="border-green-500"
          />
          <StatCard 
            title="Overdue" 
            value={stats.overdue} 
            color="border-red-500"
          />
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                activeTab === 'tasks'
                  ? 'bg-pink-500 text-white border-b-2 border-pink-500'
                  : 'text-gray-600 hover:text-pink-500 hover:bg-pink-50'
              }`}
            >
              <span className="inline-flex items-center">
                <span className="mr-2">📋</span>
                View Tasks ({tasks.length})
              </span>
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                activeTab === 'add'
                  ? 'bg-pink-500 text-white border-b-2 border-pink-500'
                  : 'text-gray-600 hover:text-pink-500 hover:bg-pink-50'
              }`}
            >
              <span className="inline-flex items-center">
                <span className="mr-2">➕</span>
                Add New Task
              </span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'tasks' ? (
              <div>
                {tasks.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No tasks yet</h3>
                    <p className="text-gray-500 mb-6">Create your first task to get started!</p>
                    <button
                      onClick={() => setActiveTab('add')}
                      className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors duration-200 font-medium"
                    >
                      Create Your First Task
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
                      <button
                        onClick={() => setActiveTab('add')}
                        className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors duration-200 text-sm font-medium inline-flex items-center"
                      >
                        <span className="mr-1">➕</span>
                        Add Task
                      </button>
                    </div>
                    <TaskList
                      tasks={tasks}
                      onUpdateTask={handleUpdateTask}
                      onDeleteTask={handleDeleteTask}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Create New Task</h2>
                  <p className="text-gray-600">Fill in the details below to add a new task to your list.</p>
                </div>
                <TaskForm onAddTask={handleAddTask} />
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setActiveTab('add')}
              className="p-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
            >
              <div className="text-2xl mb-2">🚀</div>
              <div className="font-medium">Quick Add</div>
              <div className="text-sm opacity-90">Add a new task</div>
            </button>
            
            <button
              onClick={() => setActiveTab('tasks')}
              className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              <div className="text-2xl mb-2">👀</div>
              <div className="font-medium">View All</div>
              <div className="text-sm opacity-90">See all tasks</div>
            </button>
            
            <button
              onClick={fetchTasks}
              className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
            >
              <div className="text-2xl mb-2">🔄</div>
              <div className="font-medium">Refresh</div>
              <div className="text-sm opacity-90">Reload tasks</div>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editTask && (
        <EditTaskModal
          task={editTask}
          onClose={() => setEditTask(null)}
          onUpdateTask={handleUpdateTask}
        />
      )}
    </div>
  );
};

export default Dashboard;
