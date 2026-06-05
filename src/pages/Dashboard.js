import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({ total: 0, upcoming: 0, completed: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/appointments');
        setAppointments(res.data);
        const now = new Date();
        const upcoming = res.data.filter(apt => new Date(apt.date) >= now).length;
        const completed = res.data.filter(apt => apt.status === 'completed').length;
        setStats({ total: res.data.length, upcoming, completed });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const recent = appointments.slice(0, 3);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome back, {user?.name} 👋</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Role: {user?.role === 'dentist' ? '🦷 Dentist' : '🩺 Nurse'}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border-l-4 border-blue-500">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Total Appointments</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border-l-4 border-green-500">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Upcoming</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{stats.upcoming}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border-l-4 border-purple-500">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Completed</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{stats.completed}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">📅 Recent Appointments</h2>
        {recent.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No appointments yet. Book one!</p>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {recent.map(apt => (
              <li key={apt._id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium dark:text-white">{apt.client?.name || 'Unknown'}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{apt.date} at {apt.time}</p>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">{apt.status || 'scheduled'}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;