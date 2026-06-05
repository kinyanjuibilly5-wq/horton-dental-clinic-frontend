import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const BookAppointment = () => {
  const [form, setForm] = useState({
    clientName: '',
    clientPhone: '',
    dentistBadge: 'D001',
    date: '',
    time: '',
    notes: ''
  });
  const [dentists, setDentists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const res = await api.get('/auth/dentists');
        setDentists(res.data);
      } catch {
        setDentists([{ badge: 'D001', name: 'Dr. Smith' }]);
      }
    };
    fetchDentists();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await api.post('/appointments', form);
      setMessage('✅ Appointment booked successfully!');
      setForm({ clientName: '', clientPhone: '', dentistBadge: 'D001', date: '', time: '', notes: '' });
    } catch (err) {
      setMessage('❌ Error: ' + (err.response?.data?.msg || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">📅 Book a New Appointment</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {message && <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-center">{message}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="clientName" placeholder="Client Name" className="input-field" value={form.clientName} onChange={handleChange} required />
            <input type="tel" name="clientPhone" placeholder="Client Phone" className="input-field" value={form.clientPhone} onChange={handleChange} required />
            <select name="dentistBadge" className="input-field" value={form.dentistBadge} onChange={handleChange} required>
              {dentists.map(d => <option key={d.badge} value={d.badge}>{d.name} ({d.badge})</option>)}
            </select>
            <input type="date" name="date" className="input-field" value={form.date} onChange={handleChange} required />
            <input type="time" name="time" className="input-field" value={form.time} onChange={handleChange} required />
            <textarea name="notes" placeholder="Notes (optional)" className="input-field md:col-span-2" rows="2" value={form.notes} onChange={handleChange}></textarea>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition">
            {loading ? 'Booking...' : 'Confirm Appointment'}
          </button>
        </form>
      </div>
      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          background-color: white;
          color: #1f2937;
        }
        .dark .input-field {
          background-color: #374151;
          border-color: #4b5563;
          color: #f3f4f6;
        }
        .input-field:focus {
          outline: none;
          ring: 2px solid #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default BookAppointment;