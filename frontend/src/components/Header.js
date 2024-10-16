import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Header = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    return (
        <header className="bg-gradient-to-r from-pink-400 to-purple-200 p-4 flex justify-between items-center">
            <h1 className="text-black text-2xl text-bold">PlanIt</h1>
            <nav className="relative">
                {user ? (
                    <>
                        <span className="text-white">Welcome, {user.username}</span>
                        <button 
                            onClick={toggleDropdown} 
                            className="text-white focus:outline-none"
                        >
                            Account
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-black rounded shadow-lg">
                                <Link to="/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    Dashboard
                                </Link>
                                <button 
                                    onClick={logoutUser} 
                                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex space-x-4">
                        <Link to="/" className="text-black">Home</Link>
                        <button onClick={toggleDropdown} className="text-black focus:outline-none">
                            Login / Signup
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg">
                                <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    Login
                                </Link>
                                <Link to="/signup" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    Signup
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
