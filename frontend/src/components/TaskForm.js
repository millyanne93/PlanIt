import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createTask } from '../api';

const TaskForm = () => {
    const { token } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState(''); // Add error state for feedback

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Log the formatted date for debugging
        console.log('Raw dueDate:', dueDate); 
        console.log({ title, description, dueDate });

        try {
            // Sending the formatted date to the API
            await createTask({ title, description, due_date: dueDate }, token);

            // Reset form after successful submission
            setTitle('');
            setDescription('');
            setDueDate('');
            setError(''); // Clear any previous errors
        } catch (err) {
            // Error handling
            const errorMessage = err.response ? err.response.data.message : 'An error occurred. Please try again.';
            setError(errorMessage); // Set the error message for feedback
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 mx-auto"
        >
            <h2 className="text-lg font-bold text-pink-600 mb-4">Create a New Task</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error if any */}
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
                required
                className="w-full p-2 border border-pink-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
                className="w-full p-2 border border-pink-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="w-full p-2 border border-pink-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
                type="submit"
                className="w-full bg-pink-600 text-white font-bold py-2 rounded hover:bg-pink-500 transition duration-200"
            >
                Create Task
            </button>
        </form>
    );
};

export default TaskForm;
