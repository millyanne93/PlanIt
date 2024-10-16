import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update import
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes> {/* Use Routes instead of Switch */}
                    <Route path="/" element={<Home />} /> {/* Use element prop */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/create-task" element={<TaskForm />} />
                    <Route path="/tasklist" element={<TaskList />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
