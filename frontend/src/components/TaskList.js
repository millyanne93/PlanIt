import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getTasks, updateTask } from '../api';

const TaskList = ({ tasks }) => {
    const { token } = useContext(AuthContext);
    const [taskList, setTaskList] = useState([]); // Renamed from `tasks` to `taskList`
    const [error, setError] = useState(null);

    // Fetch tasks from the backend
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasks(token);
                setTaskList(data); // Updated to `taskList`
            } catch (error) {
                setError(error.message);
            }
        };

        if (token) {
            fetchTasks();
        }
    }, [token]);

    // Update task status
    const handleStatusChange = async (taskId, status) => {
        try {
            await updateTask(taskId, { status }, token);
            setTaskList(taskList.map(task => task.id === taskId ? { ...task, status } : task)); // Updated to `taskList`
        } catch (error) {
            setError(error.message);
        }
    };

    const columns = {
        "To Do": taskList.filter(task => task.status === "To Do"), // Updated to `taskList`
        "In Progress": taskList.filter(task => task.status === "In Progress"),
        "Completed": taskList.filter(task => task.status === "Completed"),
    };

    return (
        <div className="flex space-x-4 p-6 bg-gray-100 rounded-lg shadow-lg overflow-x-auto">
            {error && <p className="text-red-600">{error}</p>}
            {Object.entries(columns).map(([columnName, tasksInColumn]) => (
                <div key={columnName} className="flex-1 min-w-[250px] p-4 bg-gray-50 rounded-lg shadow-md">
                    <h2 className="text-lg font-bold text-gray-700 mb-4">{columnName}</h2>
                    <ul className="space-y-4">
                        {tasksInColumn.length > 0 ? tasksInColumn.map(task => (
                            <li key={task.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                                <h3 className="text-md font-semibold text-gray-800">{task.title}</h3>
                                <p className="text-sm text-gray-600">{task.description}</p>
                                <p className="text-sm text-gray-500">Due: {new Date(task.due_date).toLocaleDateString()}</p>
                                <div className="mt-2 flex space-x-2">
                                    <button
                                        className="bg-blue-500 text-white p-1 rounded text-xs"
                                        onClick={() => handleStatusChange(task.id, "In Progress")}
                                        disabled={task.status === "In Progress"}>
                                        Move to In Progress
                                    </button>
                                    <button
                                        className="bg-green-500 text-white p-1 rounded text-xs"
                                        onClick={() => handleStatusChange(task.id, "Completed")}
                                        disabled={task.status === "Completed"}>
                                        Mark as Completed
                                    </button>
                                </div>
                            </li>
                        )) : (
                            <p className="text-gray-500">No tasks in this column.</p>
                        )}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
