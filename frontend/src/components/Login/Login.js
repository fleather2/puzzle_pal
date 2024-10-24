import React from 'react';
import { useFormik } from 'formik';

const LoginForm = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            password: '',
        },
        onSubmit: values => {
            // Submit login data to the server
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <input 
                type="text"
                placeholder="Username"
                name="username"
                value={formik.values.name}
                onChange={formik.handleChange}
            /> 
            <br />
            <input 
                type="password"
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