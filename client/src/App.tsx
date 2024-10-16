import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import UserManagement from './pages/dashboard/users/UserManagement';
import UserList from './pages/dashboard/users/UserList';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
// import About from './pages/about';
// import NotFound from './pages/404'; // Optional: Not Found page

export const description =
  "A simple login form with email and password. The submit button says 'Sign in'."

const App: React.FC = () => {
  return (
    <Router>
      {/* <Header /> */}
        <Routes>
          <Route path="/dashboard/users" element={<PrivateRoute><UserManagement /></PrivateRoute>} />
          <Route path="/dashboard/users-list" element={<PrivateRoute><UserList /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/" element={<Login />} />
        </Routes>
    </Router>
  );
}

export default App;
