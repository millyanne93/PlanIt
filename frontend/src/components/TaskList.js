import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getTasks } from '../api';

const TaskList = () => {
    const { token } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);  // Add state to handle errors

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                console.log('Token being sent:', token);  // Log token to check if it's being passed correctly
                const data = await getTasks(token);
                setTasks(data);
            } catch (error) {
                console.error('Failed to fetch tasks:', error.message);  // Log the error message
                setError(error.message);  // Set error in state
            }
        };

        if (token) {
            fetchTasks();  // Only fetch tasks if the token is available
        } else {
            console.error('Token is missing');
            setError('Token is missing');  // Display an error message if no token
        }
    }, [token]);

    return (
        <div className="tasklist-container p-6 bg-gray-50 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Your Tasks</h2>

            {/* Display error message if any */}
            {error ? (
                <p className="text-red-600">{error}</p>
            ) : (
                <ul className="space-y-4">
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <li key={task.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                                <h3 className="text-xl font-semibold text-pink-500">{task.title}</h3>
                                <p className="text-gray-700">{task.description}</p>
                                <p className="text-gray-500">Due: <span className="font-semibold">{new Date(task.due_date).toLocaleDateString()}</span></p>
                                <p className="text-gray-500">Status: <span className={`font-semibold ${task.status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>{task.status}</span></p>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-600">No tasks available.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
