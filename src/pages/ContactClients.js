import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

const ContactClients = () => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({ name: '', phone: '', email: '' });
  const { user } = useAuth();
  const isDentist = user?.role === 'dentist';

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const res = await api.get('/clients');
    setClients(res.data);
  };

  const addClient = async (e) => {
    e.preventDefault();
    try {
      await api.post('/clients', newClient);
      fetchClients();
      setNewClient({ name: '', phone: '', email: '' });
    } catch (err) {
      alert('Error adding client: ' + (err.response?.data?.msg || err.message));
    }
  };

  const deleteClient = async (id) => {
    if (!window.confirm('Delete this client?')) return;
    try {
      await api.delete(`/clients/${id}`);
      fetchClients();
    } catch (err) {
      alert('Error deleting client');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-purple-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">📇 Client Directory</h2>
        </div>
        <div className="p-6">
          {isDentist && (
            <form onSubmit={addClient} className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex flex-wrap gap-3">
              <input placeholder="Full name" className="flex-1 input-field" value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} required />
              <input placeholder="Phone number" className="flex-1 input-field" value={newClient.phone} onChange={e => setNewClient({...newClient, phone: e.target.value})} required />
              <input placeholder="Email (optional)" className="flex-1 input-field" value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})} />
              <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">Add Client</button>
            </form>
          )}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                  {isDentist && <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {clients.map(c => (
                  <tr key={c._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-white">{c.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-300">{c.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-300">{c.email || '—'}</td>
                    {isDentist && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button onClick={() => deleteClient(c._id)} className="text-red-600 hover:text-red-800 dark:text-red-400">Delete</button>
                      </td>
                    )}
                  </tr>
                ))}
                {clients.length === 0 && (
                  <tr><td colSpan={isDentist ? 4 : 3} className="px-6 py-4 text-center text-gray-500">No clients yet. Add one!</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style jsx>{`
        .input-field {
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          background-color: white;
        }
        .dark .input-field {
          background-color: #374151;
          border-color: #4b5563;
          color: #f3f4f6;
        }
      `}</style>
    </div>
  );
};

export default ContactClients;