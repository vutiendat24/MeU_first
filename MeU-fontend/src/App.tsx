import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import HomePage from './pages/HomePage';
import Dashboard from './components/Dashboard';
import ComingSoon from './components/ComingSoon';
import './App.css';

function App() {
  const isLoggedIn = !!localStorage.getItem('access_token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/home" replace /> : <LoginForm />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/home" replace /> : <RegisterForm />} />
        <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<ComingSoon />} />
      </Routes>
    </Router>
  );
}

export default App;
