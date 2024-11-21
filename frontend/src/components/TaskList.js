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
       <div className="overflow-x-auto">
           <h2 className="text-2xl font-bold text-pink-600 mb-4">Your Tasks</h2>
           {error && <p className="text-red-600">{error}</p>}
           {tasks.length > 0 ? (
               <table className="w-full text-left border-collapse border border-gray-300">
                   <thead className="bg-pink-200 text-pink-800">
                       <tr>
                           <th className="p-4 border border-gray-300">Title</th>
                           <th className="p-4 border border-gray-300">Description</th>
                           <th className="p-4 border border-gray-300">Due Date</th>
                           <th className="p-4 border border-gray-300">Status</th>
                           <th className="p-4 border border-gray-300">Actions</th>
                       </tr>
                   </thead>
                   <tbody>
                       {tasks.map((task) => (
                           <tr key={task.id} className="hover:bg-gray-100">
                               <td className="p-4 border border-gray-300">{task.title}</td>
                               <td className="p-4 border border-gray-300">{task.description}</td>
                               <td className="p-4 border border-gray-300">{new Date(task.due_date).toLocaleDateString()}</td>
                               <td className={`p-4 border border-gray-300 ${task.status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>
                                   {task.status}
                               </td>
                               <td className="p-4 border border-gray-300">
                                   <button
                                       className="bg-blue-500 text-white p-1 rounded"
                                       onClick={() => {
                                           setEditingTask(task.id);
                                           setEditedTitle(task.title);
                                           setEditedDescription(task.description);
                                           setEditedDueDate(task.due_date);
                                       }}>
                                       Edit
                                   </button>
                                   <button
                                       className="bg-red-500 text-white p-1 rounded ml-2"
                                       onClick={() => handleDeleteTask(task.id)}>
                                       Delete
                                   </button>
                                   <button
                                       className="bg-green-500 text-white p-1 rounded ml-2"
                                       onClick={() => handleCompleteTask(task.id)}
                                       disabled={task.status === 'Completed'}>
                                       {task.status === 'Completed' ? 'Completed' : 'Mark as Completed'}
                                   </button>
                               </td>
                           </tr>
                       ))}
                   </tbody>
               </table>
           ) : (
               <p className="text-gray-600">No tasks available.</p>
           )}
       </div>
          
    );
};

export default TaskList;
