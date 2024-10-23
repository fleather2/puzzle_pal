import './App.css';
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div>
      <h1>Landing Page</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={ <Login /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
