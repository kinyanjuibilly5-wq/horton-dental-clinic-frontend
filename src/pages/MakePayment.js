import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const MakePayment = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedApt, setSelectedApt] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('cash');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get('/appointments');
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAppointments();
  }, []);

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await api.post('/payments', { appointmentId: selectedApt, amount, method });
      setMessage('✅ Payment recorded successfully!');
      setSelectedApt('');
      setAmount('');
    } catch (err) {
      setMessage('❌ Error: ' + (err.response?.data?.msg || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-green-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">💰 Make a Payment</h2>
        </div>
        <form onSubmit={handlePay} className="p-6 space-y-4">
          {message && <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-center">{message}</div>}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Select Appointment</label>
            <select className="input-field" value={selectedApt} onChange={(e) => setSelectedApt(e.target.value)} required>
              <option value="">-- Choose appointment --</option>
              {appointments.map(apt => (
                <option key={apt._id} value={apt._id}>
                  {apt.client?.name} - {new Date(apt.date).toDateString()} {apt.time}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Amount (KSH)</label>
              <input type="number" placeholder="0.00" className="input-field" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Payment Method</label>
              <select className="input-field" value={method} onChange={(e) => setMethod(e.target.value)}>
                <option value="cash">💵 Cash</option>
                <option value="card">💳 Card</option>
                <option value="online">🌐 Online</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
            {loading ? 'Processing...' : 'Pay Now'}
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

export default MakePayment;