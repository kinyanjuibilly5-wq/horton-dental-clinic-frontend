import React from 'react';
import api from '../utils/api';

const GenerateReport = () => {
  const downloadReport = async () => {
    try {
      const response = await api.get('/generate/appointment-report', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'appointments.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Error generating report: ' + (err.response?.data?.msg || err.message));
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
        <div className="text-6xl mb-4">📊</div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Generate Reports</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Download a complete list of all appointments as a PDF document.</p>
        <button
          onClick={downloadReport}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105 inline-flex items-center gap-2"
        >
          📑 Download Appointment Report (PDF)
        </button>
      </div>
    </div>
  );
};

export default GenerateReport;