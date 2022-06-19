import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

export default function EditModal({show, setShow, name, email, id}) {
  const [nameCorrect, setNameCorrect] = useState(false);
  const [emailCorrect, setEmailCorrect] = useState(false); 
  const [correctForm, setCorrectForm] = useState(true)
  const [nameValue, setNameValue] = useState(name)
  const [emailValue, setEmailValue] = useState(email)

  const nameRef = useRef()
  const emailRef = useRef()

  const expressions = {
    fullName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  }

  const validateForm = ()=>{
    setNameValue(nameRef.current.value)

    if (expressions.fullName.test(nameValue)) setNameCorrect(true)
    else setNameCorrect(false)
    
    setEmailValue(emailRef.current.value)

    if (expressions.email.test(emailValue)) setEmailCorrect(true)
    else setEmailCorrect(false)

    if (nameCorrect && emailCorrect) setCorrectForm(true);
    else setCorrectForm(false)
  }

  useEffect(()=>{
    validateForm()
  })

  const instance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
  })

  const handleFinish = async (text, id)=>{ //Close modal
    validateForm()

    if (text !== 'Cancel') {
      if (correctForm){
        setShow(!show)
        await instance.post(`/contacts/edit/${id}`, {
          "name": nameRef.current.value,
          "email": emailRef.current.value
        }) 
        
      }
      else alert('Enter correct values');
    } 
    else setShow(!show)
  } 

  return(
    <>
      <Modal show={show} onHide={setShow} >
        <Modal.Header closeButton>
          <Modal.Title>Add new contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label className="form-label">New name:</label>  
            <input type="text" className='mb-3 form-control' value={nameValue} name='name' ref={nameRef} onChange={validateForm}/>

            <label className="form-label">New email:</label>
            <input type="text" className='form-control' value={emailValue} name='email' ref={emailRef} onChange={validateForm}/>
          </form>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-center'>
          <Button variant="danger" onClick={(e)=>handleFinish(e.target.textContent, id)} >
            Cancel
          </Button>
          <Button variant="success" onClick={(e)=>handleFinish(e.target.textContent, id)} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> 
    </>
  )
}
