import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createUserWithEmailAndPassword, getAuth, } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app)

const Regester = () => {

    const [passError, setPassError] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [user, setUser] = useState({})

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;

        const isNonWhiteSpace = /^\S*$/;
        if (!isNonWhiteSpace.test(password)) {
            setPassError("Password must not contain Whitespaces.")
            return
        }

        const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        if (!isContainsUppercase.test(password)) {
            setPassError("Password must have at least one Uppercase Character.")
            return
        }

        const isContainsLowercase = /^(?=.*[a-z]).*$/;
        if (!isContainsLowercase.test(password)) {
            setPassError("Password must have at least one Lowercase Character.")
            return
        }

        const isContainsNumber = /^(?=.*[0-9]).*$/;
        if (!isContainsNumber.test(password)) {
            setPassError("Password must contain at least one Digit.")
            return
        }

        const isContainsSymbol =
            /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
        if (!isContainsSymbol.test(password)) {
            setPassError("Password must contain at least one Special Symbol.")
            return
        }
        if (password.length < 6) {
            setPassError("Password must contain at least 6 character.")
            return
        }
        setPassError('')
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                setUser(result.user)
                setPassError('')
                setIsSuccess(true)
            }).catch(err => {
                setPassError(err.massage);
                setIsSuccess(false)
            })


    }
    return (
        <div>
            <section>
                <Form onSubmit={handleOnSubmit} className='w-50 mx-auto mt-5'>
                    <h2 className='text-success'>Please Resister!!!</h2>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" required name="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required name="password" placeholder="Password" />
                        {passError && <p className='text-danger'>{passError}</p>}
                        {isSuccess && <p className='text-success'>User created Successfully</p>}
                    </Form.Group>

                    {user.displayName ? <Button variant="dark" type="submit">
                        Login
                    </Button> : <Button variant="dark" type="submit">
                        Register
                    </Button>}
                    <br />
                    <small>Already have an account? please <Link to='/login'>Login.</Link></small>

                </Form>
            </section>
        </div>
    );
};

export default Regester;