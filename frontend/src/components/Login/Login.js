import {React}  from 'react';
import { useFormik } from 'formik';
import { AuthProvider, useAuth } from '../../contexts/AuthContext'


const LoginForm = () => {
    const {login, user} = useAuth();

    const formik = useFormik({
        initialValues: {
            name: '',
            password: '',
        },
        onSubmit: values => {
            console.log("Logging in");
            console.log(login(values));
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