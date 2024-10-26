import {React, useState}  from 'react';
import { useFormik } from 'formik';
import { AuthProvider, useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';


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
        <Card style={{ width: '50rem'}}>
            <Card.Body>
                <Card.Header as="h5">Login</Card.Header>
                <br />
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        /> 
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">Login</Button>
                </Form>
                <p>{loginFailed ? "LOGIN FAILED" : ""}</p>
            </Card.Body>
        </Card>
    );
};
export default LoginForm;