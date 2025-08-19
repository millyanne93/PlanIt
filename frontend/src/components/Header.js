import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
    const { user, logoutUser, loading } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleLogout = () => {
        logoutUser();
        setDropdownOpen(false);
    };

    if (loading) {
        return (
            <header className="bg-white p-4 flex justify-between items-center">
                <h1 className="text-pink-700 text-2xl font-bold">PlanIt</h1>
                <nav className="relative">
                    <div className="flex space-x-4 items-center">
                        <Link to="/" className="text-pink-900">Home</Link>
                        <div className="text-gray-500">Loading...</div>
                    </div>
                </nav>
            </header>
        );
    }

    return (
        <header className="sticky top-0 bg-white p-4 flex justify-between items-center shadow-sm z-50">
            <Link to="/" className="text-pink-700 text-2xl font-bold hover:text-pink-800 transition-colors">
                PlanIt
            </Link>

            <nav className="relative" ref={dropdownRef}>
                <div className="flex space-x-4 items-center">
                    <Link
                        to="/"
                        className="text-pink-900 hover:text-pink-700 transition-colors font-medium"
                    >
                        Home
                    </Link>

                    {user ? (
                        <>
                            <span className="text-gray-700 font-medium">
                                Welcome, <span className="text-pink-800">{user.username || user.name || 'User'}</span>
                            </span>

                            <button
                                onClick={toggleDropdown}
                                className="text-pink-900 hover:text-pink-700 focus:outline-none font-medium px-3 py-1 rounded-md hover:bg-pink-50 transition-all"
                            >
                                Account ▼
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                    <Link
                                        to="/dashboard"
                                        className="block px-4 py-2 text-gray-800 hover:bg-pink-50 hover:text-pink-800 transition-colors rounded-t-lg"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        📊 Dashboard
                                    </Link>
                                    <hr className="my-1" />
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-800 transition-colors rounded-b-lg"
                                    >
                                        🚪 Logout
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <button
                                onClick={toggleDropdown}
                                className="text-pink-900 hover:text-pink-700 focus:outline-none font-medium px-3 py-1 rounded-md hover:bg-pink-50 transition-all"
                            >
                                Login / Signup ▼
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                    <Link
                                        to="/login"
                                        className="block px-4 py-2 text-gray-800 hover:bg-pink-50 hover:text-pink-800 transition-colors rounded-t-lg"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        🔑 Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="block px-4 py-2 text-gray-800 hover:bg-pink-50 hover:text-pink-800 transition-colors rounded-b-lg"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        📝 Sign Up
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
