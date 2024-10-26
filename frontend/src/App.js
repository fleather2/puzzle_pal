import './App.css';
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login'
import {StrictMode} from 'react';
import LogoutButton from './components/Login/LogoutButton';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

function App() {

  return (
    <StrictMode>
      <AuthProvider>
          <BrowserRouter>
            <h1>Puzzle Pal</h1>
            <LogoutButton />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={ <Login /> } />
            </Routes>
          </BrowserRouter>
      </AuthProvider>
    </StrictMode>

  );
}
export default App;
