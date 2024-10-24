import {React}  from 'react';
import { useFormik } from 'formik';
import { AuthProvider, useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const {login, user} = useAuth();
    const navigate = useNavigate();

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
                console.error("Login failed")
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
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
            <button type="submit">Login</button>
        </form>
    );
};
export default LoginForm;