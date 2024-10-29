import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getTasks, updateTask, deleteTask } from '../api';

const TaskList = () => {
    const { token } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [editingTask, setEditingTask] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedDueDate, setEditedDueDate] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasks(token);
                setTasks(data);
            } catch (error) {
                setError(error.message);
            }
        };

        if (token) {
            fetchTasks();
        }
    }, [token]);

    // Handle marking task as completed
    const handleCompleteTask = async (taskId) => {
        try {
            const updatedTask = { status: 'Completed' };

            await updateTask(taskId, updatedTask, token);
            const updatedTasks = tasks.map(task =>
                task.id === taskId ? { ...task, status: 'Completed' } : task
            );
            setTasks(updatedTasks);
        } catch (error) {
            setError(error.message);
        }
    };

    // Handle task updates
    const handleUpdateTask = async (taskId) => {
        const updatedTask = {
            title: editedTitle,
            description: editedDescription,
            due_date: editedDueDate,
        };

        try {
            await updateTask(taskId, updatedTask, token);
            const updatedTasks = tasks.map(task =>
                task.id === taskId ? { ...task, ...updatedTask } : task
            );
            setTasks(updatedTasks);
            setEditingTask(null);
        } catch (error) {
            setError(error.message);
        }
    };

    // Handle task deletion
    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId, token);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="tasklist-container p-6 bg-gray-50 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Your Tasks</h2>

            {error && <p className="text-red-600">{error}</p>}

            <ul className="space-y-4">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <li key={task.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                            {editingTask === task.id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                                    />
                                    <textarea
                                        value={editedDescription}
                                        onChange={(e) => setEditedDescription(e.target.value)}
                                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                                    />
                                    <input
                                        type="date"
                                        value={editedDueDate}
                                        onChange={(e) => setEditedDueDate(e.target.value)}
                                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                                    />
                                    <button
                                        className="bg-green-500 text-white p-2 rounded"
                                        onClick={() => handleUpdateTask(task.id)}>
                                        Save
                                    </button>
                                    <button
                                        className="bg-gray-500 text-white p-2 rounded ml-2"
                                        onClick={() => setEditingTask(null)}>
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-xl font-semibold text-pink-500">{task.title}</h3>
                                    <p className="text-gray-700">{task.description}</p>
                                    <p className="text-gray-500">Due: <span className="font-semibold">{new Date(task.due_date).toLocaleDateString()}</span></p>
                                    <p className="text-gray-500">Status: <span className={task.status === 'Completed' ? 'text-green-600' : 'text-red-600'}>{task.status}</span></p>

                                    <button
                                        className="bg-blue-500 text-white p-2 rounded"
                                        onClick={() => {
                                            setEditingTask(task.id);
                                            setEditedTitle(task.title);
                                            setEditedDescription(task.description);
                                            setEditedDueDate(task.due_date);
                                        }}>
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white p-2 rounded ml-2"
                                        onClick={() => handleDeleteTask(task.id)}>
                                        Delete
                                    </button>
                                    <button
                                        className="bg-green-500 text-white p-2 rounded ml-2"
                                        onClick={() => handleCompleteTask(task.id)}
                                        disabled={task.status === 'Completed'}>
                                        {task.status === 'Completed' ? 'Completed' : 'Mark as Completed'}
                                    </button>
                                </div>
                            )}
                        </li>
                    ))
                ) : (
                    <p className="text-gray-600">No tasks available.</p>
                )}
            </ul>
        </div>
    );
};

export default TaskList;
