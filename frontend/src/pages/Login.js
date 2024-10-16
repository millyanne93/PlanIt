import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Change useHistory to useNavigate
import { login } from '../api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Change history to navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ username, password });
            navigate('/dashboard'); // Redirect to home page on successful login
        } catch (err) {
            // Check if err.response is defined
            const errorMessage = err.response ? err.response.data.message : 'An error occurred. Please try again.';
            setError(errorMessage);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-pink-600">Login</h2>
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
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
