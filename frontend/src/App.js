import './App.css';
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login'
import {StrictMode} from 'react';
import LogoutButton from './components/Login/LogoutButton';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <StrictMode>
      <AuthProvider>
        <Container fluid>
          <BrowserRouter>
            <h1>Puzzle Pal</h1>
            <LogoutButton />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={ <Login /> } />
            </Routes>
          </BrowserRouter>
          </Container>
      </AuthProvider>
    </StrictMode>

  );
}
export default App;
