import React from "react";
import { Form, Container, Button, Alert } from "react-bootstrap";
import "../styles/querys.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

export default function SignIn() {
  const navigate = useNavigate()

  //States to validate if the values of the form are correct.
  const [usernameCorrect, setUsernameCorrect] = useState(false);
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [showAlert, setShowAlert] = useState(false)
  const [correctForm, setCorrectForm] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  // Ref to get the input values.
  const userNameRef = useRef()
  const passwordRef = useRef()

  const expressions = {
    username: /^[a-zA-Z0-9_-]{4,20}$/,
    password: /^.{4,20}$/,
  }

  const validateForm = (e)=>{
    switch(e.target.name) {
      case 'username':
        if (expressions.username.test(e.target.value)) setUsernameCorrect(true)
        else setUsernameCorrect(false)

        break;
      case 'password':
        if (expressions.password.test(e.target.value)) setPasswordCorrect(true)
        else setPasswordCorrect(false)

        break;
      default:
        console.log('ERROR');
    }
  }

  const instance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
  })

  const signIn = async (e) => {
    e.preventDefault()
    
    if (usernameCorrect && passwordCorrect) {
      setCorrectForm(true)
      setShowAlert(false)
    } else {
      setCorrectForm(false)
      setShowAlert(true)
    }

    if (correctForm){
      try {
        await instance.post('/signin', {
          "username": userNameRef.current.value,
          "password": passwordRef.current.value
        })  
        navigate('/profile')
      } catch (err){
        alert('The username or the password fields are incorrect.')
      }
    }
  }

  return (
    <>
      <header>
        <Alert variant='danger' className={`alert ${showAlert ? 'd-block' : 'd-none'}`}>Please enter correct values</Alert>
      </header>
      <Container className="sign-in-container secondary-text mt-5 w-25 p-5" style={{ background: "#99c", borderRadius:'20px' }}>
        <header className="text-center primary-text" style={{ fontSize: "50px" }}>
          Sign In!
        </header>
        <Form>
          <Form.Group className="mt-5 d-flex justify-content-center ">
            <Form.Label className="me-3 form-item">Username</Form.Label>
            <Form.Control type="text" 
              className="w-50" 
              onChange={validateForm} 
              ref={userNameRef} 
              placeholder='From 4 to 20 characters'
              name='username'>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mt-5 d-flex justify-content-center ">
            <Form.Label className="me-3 form-item">Password</Form.Label>
            <Form.Control type={showPassword ? 'text' : 'password'} 
              className="w-50 d-inline-block" 
              onChange={validateForm} 
              ref={passwordRef}
              placeholder='From 4 to 20 characters' 
              name='password'>
            </Form.Control>

            <i 
              className={`fa-solid ${!showPassword ? 'fa-eye' : 'fa-eye-slash'} fa-eye password-fa text-start align-self-center`} 
              onClick={()=>setShowPassword(!showPassword)}
            ></i>
          </Form.Group>
          <div className="mt-5">
            <Button className="confirm-sign-in border-0 me-3" onClick={signIn} style={{ background: "#944" }}>
              Sign in!
            </Button>
            <span>
              Don't have an account? <Link to='/signup'>Sign up now!</Link>
            </span>
          </div>
        </Form>
      </Container>
    </>
  );
}
