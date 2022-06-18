import React, { useRef, useState } from 'react';
import { Form, Container, Alert } from "react-bootstrap";
import "../styles/querys.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

export default function SignUp () {
  const navigate = useNavigate()

  //States to validate if the values of the form are correct.
  const [fullnameCorrect, setFullnameCorrect] = useState(false);
  const [usernameCorrect, setUsernameCorrect] = useState(false);
  const [emailCorrect, setEmailCorrect] = useState(false); 
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [showAlert, setShowAlert] = useState(false)
  const [correctForm, setCorrectForm] = useState(false)
  const [checkedTerms, setCheckedTerms] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  // References to get the input values.
  const fullnameRef = useRef()
  const userNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const expressions = {
    username: /^[a-zA-Z0-9_-]{4,20}$/,
    fullName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    password: /^.{4,20}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  }

  const validateForm = (e)=>{
    switch(e.target.name) {
      case 'fullname':
        if (expressions.fullName.test(e.target.value)) setFullnameCorrect(true)
        else setFullnameCorrect(false)

        break;
      case 'username':
        if (expressions.username.test(e.target.value)) setUsernameCorrect(true)
        else setUsernameCorrect(false)

        break;
      case 'email':
        if (expressions.email.test(e.target.value)) setEmailCorrect(true)
        else setEmailCorrect(false)

        break;
      case 'password':
        if (expressions.password.test(e.target.value)) setPasswordCorrect(true)
        else setPasswordCorrect(false)

        break;
      default:
        console.log('ERROR');
    }
  }

  const instance = axios.create({ // axios object to make requests.
    baseURL: 'http://localhost:8000/',
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
  })

  const createUser = async (e) => {
    e.preventDefault()
    
    if (fullnameCorrect && usernameCorrect && passwordCorrect && emailCorrect && checkedTerms) {
      setCorrectForm(true)
      setShowAlert(false)
    } else {
      setCorrectForm(false)
      setShowAlert(true)
    }

    if (correctForm){
      try {
        await instance.post('/signup', {
          "fullname": fullnameRef.current.value,
          "username": userNameRef.current.value,
          "email": emailRef.current.value,
          "password": passwordRef.current.value
        })
        navigate('/profile')
      }
      catch(err) {console.log('err')}
    }
  }
  


  return(
    <>
      <header>
        <Alert variant='danger' className={`alert ${showAlert ? 'd-block' : 'd-none'}`}>
          Please enter correct values and accept the terms of service
        </Alert>
      </header>
      <Container className="sign-in-container secondary-text mt-5 w-25 p-5" style={{ background: "#99c", borderRadius:'20px' }}>
        <header className="text-center primary-text" style={{ fontSize: "50px" }}>
          Sign Up!
        </header>
        <Form>
          <Form.Group className="mt-5 d-flex justify-content-center ">
            <Form.Label className="me-3 form-item">Full name</Form.Label>
            <Form.Control type="text" className="w-50" name='fullname' onChange={validateForm} ref={fullnameRef} required></Form.Control>
          </Form.Group>
          <Form.Group className="mt-5 d-flex justify-content-center ">
            <Form.Label className="me-3 form-item">Username</Form.Label>
            <Form.Control type="text" 
              className="w-50" 
              name='username' 
              onChange={validateForm} 
              ref={userNameRef} 
              placeholder='From 4 to 20 characters'
              required>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mt-5 d-flex justify-content-center ">
            <Form.Label className="me-3 form-item">Email</Form.Label>
            <Form.Control type="email" className="w-50" name='email' onChange={validateForm} ref={emailRef} required></Form.Control>
          </Form.Group>
          <Form.Group className="mt-5 mb-2 d-flex justify-content-center ">
            <Form.Label className="me-3 form-item">Password</Form.Label>
            <Form.Control type={showPassword ? 'text' : 'password'} 
              className="w-50" 
              name='password' 
              onChange={validateForm} 
              ref={passwordRef} 
              placeholder='From 4 to 20 characters'
              required>
            </Form.Control>
            <i 
              className={`fa-solid ${!showPassword ? 'fa-eye' : 'fa-eye-slash'} fa-eye password-fa text-start align-self-center`} 
              onClick={()=>setShowPassword(!showPassword)}
            ></i>
          </Form.Group>
          <Form.Text className='ms-4'>
            We'll never share your information with anyone else.
          </Form.Text>
          <Form.Group className="my-3 d-flex justify-content-center" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" className='me-2 form-item' onChange={()=>setCheckedTerms(!checkedTerms)} required/>
            <span className='form-item'>Accept 
              <span><a href='/terms' target="_blank"> Terms of Service</a></span>
            </span>
          </Form.Group>
          <div className="mt-5">
            <span className='ms-3'>
              <button className="confirm-sign-in btn text-white me-3" onClick={createUser} style={{ background: "#944" }} >Sign up</button>
              Already have an account? <Link to="/signin">Sign in!</Link>
            </span>
          </div>
        </Form>
      </Container>
    </>
  )
}