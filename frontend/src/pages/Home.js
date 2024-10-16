import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-200 to-white p-8">
            <header className="text-center mb-12">
                <h1 className="text-pink-600 text-6xl font-bold">Welcome to PlanIt!</h1>
                <p className="text-gray-700 mt-2 text-lg">Your personal task management application.</p>
                <Link to="/signup" className="mt-4 inline-block bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition">
                    Get Started
                </Link>
            </header>
            <section className="features mb-12">
                <h2 className="text-pink-600 text-3xl font-semibold text-center">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 max-w-4xl mx-auto">
                    {[
                        { icon: 'fas fa-tasks', title: 'Task Management', description: 'Manage tasks easily.' },
                        { icon: 'fas fa-bell', title: 'Reminders', description: 'Set due dates.' },
                        { icon: 'fas fa-tags', title: 'Categorization', description: 'Organize tasks.' },
                        { icon: 'fas fa-chart-line', title: 'Progress Tracking', description: 'Track progress.' },
                        { icon: 'fas fa-user-friends', title: 'User-Friendly', description: 'Easy to use.' },
                    ].map((feature, index) => (
                        <div key={index} className="bg-gradient-to-r from-pink-300 to-pink-100 shadow-lg rounded-lg p-4 hover:shadow-xl transition transform hover:scale-105">
                            <div className="flex items-center mb-2">
                                <div className="bg-pink-600 rounded-full p-3">
                                    <i className={`${feature.icon} text-white text-2xl`}></i>
                                </div>
                                <h3 className="text-pink-600 font-semibold ml-3">{feature.title}</h3>
                            </div>
                            <p className="text-gray-700">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            <footer className="text-center">
                <p className="text-gray-700">Your journey to productivity starts here!</p>
                <Link to="/signup" className="mt-4 inline-block bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition">
                    Sign Up Now
                </Link>
            </footer>
        </div>
    );
};

export default Home;
