import {React, useState}  from 'react';
import { useFormik } from 'formik';
import { AuthProvider, useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const LoginForm = () => {
    const {login, logout, user} = useAuth();
    
    const navigate = useNavigate();
    const [loginFailed, setLoginFailed] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            password: '',
        },
        onSubmit: async (values) => {
            console.log("Logging in");
            var result = await login(values);
            if (result == true) { // Login successful
                navigate("/dashboard");
            } else {
                console.error("Login failed");
                setLoginFailed(true);
            }
        }
    });

    return (
        <div>
            <Form onSubmit={formik.handleSubmit}>
                <input 
                    type="text"
                    placeholder="Username"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                /> 
                <br />
                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
                <br />
                <Button variant="primary" type="submit">Login</Button>
            </Form>
            <p>{loginFailed ? "LOGIN FAILED" : ""}</p>
        </div>
    );
};
export default LoginForm;