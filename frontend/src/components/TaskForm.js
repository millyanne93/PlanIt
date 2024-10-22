import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createTask } from '../api';

const TaskForm = () => {
    const { token } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title || !dueDate) {
            setError('Title and Due Date are required');
            return;
        }

        const formattedDueDate = new Date(dueDate).toISOString().split('T')[0];

        const formData = {
            title: title,
            description: description,
            due_date: formattedDueDate
        };

        console.log('Form Data being sent to the API:', formData);
        console.log('Token being used for authentication:', token);

        try {
            const response = await createTask(formData, token);
            console.log('Task creation response:', response);

            if (response.status === 201) {
                console.log("Task created successfully!");
                setTitle('');
                setDescription('');
                setDueDate('');
                setError('');
            } else {
                setError(`Failed to create task. Server response: ${response.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error("API Error:", error);
            setError("An error occurred while creating the task.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 mx-auto">
            <h2 className="text-lg font-bold text-pink-600 mb-4">Create a New Task</h2>
            {error && <p className="text-red-600">{error}</p>}
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button type="submit" className="bg-pink-600 text-white p-2 rounded">Create Task</button>
        </form>
    );
};

export default TaskForm;
