import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';


function Logout() {
    const {logout, user} = useAuth();
    const navigate = useNavigate();

    async function doLogout() {
        await logout();
        console.log("Trying to log out!");
        navigate("/login");
    }
    useEffect(() => {
        doLogout();
    })     
}

export default Logout;