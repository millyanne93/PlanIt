import React from 'react';
import TaskForm from '../components/TaskForm'; // Component for adding tasks
import TaskList from '../components/TaskList'; // Component for displaying tasks

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-pink-200 to-pink-100 flex flex-col items-center py-8">
            <header className="w-full max-w-2xl text-center mb-6 p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-pink-600">Your Dashboard</h1>
                <p className="text-gray-600 mt-2">Manage your tasks effectively.</p>
            </header>
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
                <TaskForm /> {/* Form to add new tasks */}
            </div>
            <div className="w-full max-w-2xl mt-6 bg-white shadow-lg rounded-lg p-6">
                <TaskList /> {/* List of existing tasks */}
            </div>
        </div>
    );
};

export default Dashboard;
