import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    const {logout} = useAuth();
    const navigate = useNavigate();

    async function doLogout() {
        await logout();
        navigate("/login");
    }
    
    return (
        <button onClick={doLogout}>Log Out</button>
    )
}

export default LogoutButton;