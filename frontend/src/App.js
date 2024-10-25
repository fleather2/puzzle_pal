import './App.css';
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login'
import Button from 'react';
import LogoutButton from './components/Login/LogoutButton';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { redirect, useNavigate } from 'react-router-dom';

function App() {

  return (
    <AuthProvider>
        <BrowserRouter>
          <h1>Puzzle Pal</h1>
          <LogoutButton></LogoutButton>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={ <Login /> } />
          </Routes>
        </BrowserRouter>
    </AuthProvider>

  );
}
export default App;
