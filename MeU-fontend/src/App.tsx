import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  const isLoggedIn = !!localStorage.getItem('access_token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <LoginForm />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/" replace /> : <RegisterForm />} />
        <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
