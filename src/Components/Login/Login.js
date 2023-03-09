import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.config';

const auth = getAuth(app)
const Login = () => {
    const handleLogin = (e) => {
        e.preventDefault();
        const from = e.target;
        const email = from.email.value;
        const password = from.password.value;
        console.log(email, password);
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
            }).catch(err => console.log(err))

    }
    return (
        <div className='mt-5'>
            <Form onSubmit={handleLogin} className='w-50 mx-auto'>
                <h2 className='text-success'>Please Login!!!</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='email' type="email" placeholder="Your email" required />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Your Password" required />
                </Form.Group>

                <Button variant="dark" type="submit">
                    Login
                </Button>
                <br />
                <small>new to this site? please <Link to='/register'>Resister.</Link></small>
            </Form>
        </div>
    );
};

export default Login;