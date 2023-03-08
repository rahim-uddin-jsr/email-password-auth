import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './App.css';

function App() {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const handleEmailPassLogin = (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value;
    setUserEmail(email)
    const password = document.getElementById('password').value;
    setUserPassword(userPassword)
  }
  return (
    <div className="App">
      <Form onSubmit={handleEmailPassLogin} className='w-50 mx-auto mt-5'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" id="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" id="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>    </div>
  );
}

export default App;
