import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Plus, BarChart3, Clock, CheckCircle, AlertTriangle, Sparkles, Eye, TrendingUp } from 'lucide-react';
import TaskForm from '../components/TaskForm';
import EditTaskModal from '../components/EditTaskModal';
import TaskList from '../components/TaskList';

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'tasks', 'add', 'analytics'
  const [editTask, setEditTask] = useState(null);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, overdue: 0 });

  const API_URL = "http://localhost:5000/tasks";

  const fetchTasks = useCallback(async () => {
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
  }, [API_URL, token]); // dependencies

  useEffect(() => {
    if (token) fetchTasks();
  }, [token, fetchTasks]);

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

  const handleAddTask = async (newTask) => {
    setTasks(prev => {
      const updated = [...prev, newTask];
      calculateStats(updated);
      return updated;
    });
    setActiveTab('tasks');
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

  // UI Components from new dashboard
  const StatCard = ({ title, value, color, icon: Icon, trend }) => (
    <div className="group relative overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-purple-200 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-white mb-2">{value}</p>
          {trend && (
            <div className="flex items-center text-green-400 text-sm">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>{trend}</span>
            </div>
          )}
        </div>
        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
          <div className={`relative w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-60 transition-opacity duration-500">
        <Sparkles className="w-4 h-4 text-purple-300" />
      </div>
    </div>
  );

  const TabButton = ({ id, label, icon: Icon, isActive, onClick, badge }) => (
    <button
      onClick={() => onClick(id)}
      className={`relative flex items-center space-x-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
        isActive ? 'bg-white/20 text-white shadow-lg shadow-purple-500/20 border border-white/30' : 'text-purple-200 hover:bg-white/10 hover:text-white border border-transparent'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
      {badge && (
        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
          {badge}
        </span>
      )}
      {isActive && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"></div>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Sparkles className="w-3 h-3 text-purple-300 opacity-40" />
          </div>
        ))}
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-2">
                Welcome Back! 👋
              </h1>
              <p className="text-purple-200 text-lg">Ready to conquer your tasks today?</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-2">
                <span className="text-purple-200 text-sm">Today: </span>
                <span className="text-white font-semibold">{new Date().toLocaleDateString()}</span>
              </div>
              <button
                onClick={() => setActiveTab('add')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Quick Add</span>
              </button>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Tasks" value={stats.total} color="from-blue-500 to-purple-600" icon={BarChart3} trend={`${tasks.length} total`} />
          <StatCard title="In Progress" value={stats.pending} color="from-yellow-500 to-orange-500" icon={Clock} trend={`${tasks.filter(t => new Date(t.due_date).toDateString() === new Date().toDateString()).length} due today`} />
          <StatCard title="Completed" value={stats.completed} color="from-green-500 to-emerald-600" icon={CheckCircle} trend={`${Math.round((stats.completed / stats.total) * 100 || 0)}% done`} />
          <StatCard title="Overdue" value={stats.overdue} color="from-red-500 to-pink-600" icon={AlertTriangle} trend={stats.overdue > 0 ? "Action needed" : "All caught up"} />
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-xl">
          <div className="flex flex-wrap border-b border-white/10 p-2">
            <TabButton id="overview" label="Overview" icon={BarChart3} isActive={activeTab === 'overview'} onClick={setActiveTab} />
            <TabButton id="tasks" label="All Tasks" icon={CheckCircle} isActive={activeTab === 'tasks'} onClick={setActiveTab} badge={tasks.length} />
            <TabButton id="add" label="Add Task" icon={Plus} isActive={activeTab === 'add'} onClick={setActiveTab} />
            <TabButton id="analytics" label="Analytics" icon={TrendingUp} isActive={activeTab === 'analytics'} onClick={setActiveTab} />
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">Your Productivity Hub</h2>
                  <p className="text-purple-200 mb-8">Stay on top of your goals with real-time insights</p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button
                    onClick={() => setActiveTab('add')}
                    className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 p-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                  >
                    <div className="text-4xl mb-3">🚀</div>
                    <h3 className="text-white font-bold text-lg mb-2">Quick Add</h3>
                    <p className="text-purple-100 text-sm">Create a new task instantly</p>
                    <div className="mt-4 flex items-center justify-center text-white">
                      <Plus className="w-5 h-5 mr-2" />
                      <span className="font-medium">Add Task</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('tasks')}
                    className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 p-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                  >
                    <div className="text-4xl mb-3">📋</div>
                    <h3 className="text-white font-bold text-lg mb-2">View Tasks</h3>
                    <p className="text-blue-100 text-sm">See all your tasks at a glance</p>
                    <div className="mt-4 flex items-center justify-center text-white">
                      <Eye className="w-5 h-5 mr-2" />
                      <span className="font-medium">View All</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className="group bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 p-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
                  >
                    <div className="text-4xl mb-3">📊</div>
                    <h3 className="text-white font-bold text-lg mb-2">Analytics</h3>
                    <p className="text-emerald-100 text-sm">Track your productivity trends</p>
                    <div className="mt-4 flex items-center justify-center text-white">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      <span className="font-medium">View Stats</span>
                    </div>
                  </button>
                </div>

                {/* Recent Tasks Preview */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Recent Tasks</h3>
                    <button
                      onClick={() => setActiveTab('tasks')}
                      className="text-purple-300 hover:text-white transition-colors duration-300 text-sm font-medium"
                    >
                      View All →
                    </button>
                  </div>
                  <TaskList 
                    tasks={tasks.slice(0, 3)} 
                    onEditTask={setEditTask} 
                    onDeleteTask={handleDeleteTask}
                    onUpdateTask={handleUpdateTask}
                  />
                </div>
              </div>
            )}

            {activeTab === 'tasks' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">All Tasks</h2>
                  <button
                    onClick={() => setActiveTab('add')}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Task</span>
                  </button>
                </div>
                {tasks.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-8xl mb-6">📝</div>
                    <h3 className="text-2xl font-bold text-white mb-4">No tasks yet!</h3>
                    <p className="text-purple-200 mb-8 text-lg">Create your first task to get started on your productivity journey</p>
                    <button
                      onClick={() => setActiveTab('add')}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <Plus className="w-5 h-5 mr-2 inline" />
                      Create Your First Task
                    </button>
                  </div>
                ) : (
                  <TaskList 
                    tasks={tasks} 
                    onEditTask={setEditTask} 
                    onDeleteTask={handleDeleteTask} 
                    onUpdateTask={handleUpdateTask}
                  />
                )}
              </div>
            )}

            {activeTab === 'add' && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Create New Task</h2>
                  <p className="text-purple-200">Add a new task to your productivity pipeline</p>
                </div>
                <TaskForm onAddTask={handleAddTask} />
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Productivity Analytics</h2>
                  <p className="text-purple-200">Track your progress and identify trends</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Completion Rate */}
                  <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                    <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                      Completion Rate
                    </h3>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white mb-2">
                        {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                      </div>
                      <p className="text-purple-200">Tasks completed</p>
                      <div className="mt-4 bg-white/10 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000"
                          style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Weekly Summary */}
                  <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                    <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
                      Task Summary
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-purple-200">Tasks Created</span>
                        <span className="text-white font-semibold">{stats.total}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-purple-200">Tasks Completed</span>
                        <span className="text-green-400 font-semibold">{stats.completed}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-purple-200">Tasks Pending</span>
                        <span className="text-yellow-400 font-semibold">{stats.pending}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-purple-200">Tasks Overdue</span>
                        <span className={`font-semibold ${stats.overdue > 0 ? 'text-red-400' : 'text-green-400'}`}>
                          {stats.overdue}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
    </div>
  );
};

export default Dashboard;
