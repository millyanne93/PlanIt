import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Change useHistory to useNavigate
import { signup } from '../api';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Change history to navigate

   const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup({ username, email, password });
            navigate('/login'); // Redirect to login on successful signup
        } catch (err) {
            // Enhanced error handling
            const errorMessage = err.response && err.response.data 
                ? err.response.data.message 
                : 'An error occurred. Please try again.';
            setError(errorMessage);
            console.error(err); // For debugging purposes
        }
    }; 

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-pink-600">Sign Up</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="mt-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-pink-600 text-white p-2 rounded hover:bg-pink-700 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
