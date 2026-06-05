import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BookAppointment from './pages/BookAppointment';
import MakePayment from './pages/MakePayment';
import ContactClients from './pages/ContactClients';
import GenerateReport from './pages/GenerateReport';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function AppContent() {
  const { user } = useAuth();
  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/book" element={<PrivateRoute><BookAppointment /></PrivateRoute>} />
        <Route path="/pay" element={<PrivateRoute><MakePayment /></PrivateRoute>} />
        <Route path="/contacts" element={<PrivateRoute><ContactClients /></PrivateRoute>} />
        <Route path="/generate" element={<PrivateRoute><GenerateReport /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;