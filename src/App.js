import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './App.css';
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, getAuth, } from "firebase/auth";
import app from './firebase/firebase.config';
import checkPasswordValidity from './utilities';

const auth = getAuth(app)
function App() {

  const [passError, setPassError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [user, setUser] = useState({})
  // react hook from 
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
    const { Password, Email } = data;
    createUserWithEmailAndPassword(auth, Email, Password)
      .then(result => {
        console.log(result.user);
      }).catch(err => {
        console.log(err);
      })
  };


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
    <div className="App">
      {/* react bootstrap */}
      <section>
        <Form onSubmit={handleOnSubmit} className='w-50 mx-auto mt-5'>
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
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          {user.displayName ? <Button variant="primary" type="submit">
            Login
          </Button> : <Button variant="primary" type="submit">
            Register
          </Button>}
        </Form>
      </section>

      <section>
        <h2 className='text-center'>React Hook From</h2>

        <form onSubmit={handleSubmit(onSubmit)} className='w-50 mx-auto'>
          <label className='mt-2' htmlFor="email">Email</label>
          <input name='email' className='w-100 p-2 mt-2 bg-primary bg-opacity-10 outline-0  border-0 rounded d-block' type="email" placeholder="Email" {...register("Email", { required: true, pattern: /^\S+@\S+$/i })} />
          <label className='mt-2' htmlFor="password">Pass</label>
          <input name='password' className='w-100 mt-2 bg-primary bg-opacity-10 outline-0 p-2 border-0 rounded d-block' type="password" placeholder="Password" {...register("Password", { required: true, maxLength: 80 })} />

          <input className='mt-2 btn btn-primary' type="submit" />
        </form>
      </section>
    </div>
  );
}

export default App;
