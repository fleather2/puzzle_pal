import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function LogoutButton() {
    const {logout, user} = useAuth();
    const navigate = useNavigate();

    async function doLogout() {
        await logout();
        navigate("/login");
    }
    
    if (user) {
        return (
            <Button variant="secondary" onClick={doLogout}>Log Out</Button>
        )
    }
}

export default LogoutButton;