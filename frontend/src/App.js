import './App.css';
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login'
import Logout from './components/Login/Logout'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';


function App() {
  return (
    <AuthProvider>
      <h1>Puzzle Pal</h1>
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={ <Login /> } />
            <Route path="/logout" element={ <Logout /> } />
          </Routes>
        </BrowserRouter>
    </AuthProvider>

  );
}
export default App;
