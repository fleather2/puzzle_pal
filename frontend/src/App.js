import './App.css';
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';


function App() {
  return (
    <div>
      <h1>Landing Page</h1>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={ <Login /> } />
            
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
export default App;
