import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center flex-wrap">
      <div className="flex space-x-4 flex-wrap">
        <Link to="/dashboard" className="dark:text-white">Dashboard</Link>
        <Link to="/book" className="dark:text-white">Book Appointment</Link>
        <Link to="/pay" className="dark:text-white">Make Payment</Link>
        <Link to="/contacts" className="dark:text-white">Contact Clients</Link>
        <Link to="/generate" className="dark:text-white">Generate Report</Link>
      </div>
      <div className="flex items-center space-x-4">
        <span className="dark:text-white">{user?.name} ({user?.role})</span>
        <button onClick={toggleDarkMode} className="p-2 rounded bg-gray-200 dark:bg-gray-700">
          {darkMode ? '☀️' : '🌙'}
        </button>
        <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;