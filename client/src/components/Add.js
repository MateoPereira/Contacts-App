import React, { useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

export default function AddModal({show, setShow}) {
  const [nameCorrect, setNameCorrect] = useState(false);
  const [emailCorrect, setEmailCorrect] = useState(false); 
  const [correctForm, setCorrectForm] = useState(false)
  const nameRef = useRef()
  const emailRef = useRef()

  const expressions = {
    fullName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  }

  const validateForm = (e)=>{
    switch(e.target.name) {
      case 'name':
        if (expressions.fullName.test(e.target.value)) setNameCorrect(true)
        else setNameCorrect(false)

        break;
      case 'email':
        if (expressions.email.test(e.target.value)) setEmailCorrect(true)
        else setEmailCorrect(false)

        break;
      default:
        console.log('ERROR');
    }
    if (nameCorrect && emailCorrect) setCorrectForm(true);
    else setCorrectForm(false)
  }

  const instance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
  })

  const handleFinish = async (e)=>{ //Close modal
    if (e.target.textContent !== 'Cancel') {
      if (correctForm){
        setShow(!show)
        await instance.post('/contacts/add', {
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
            <label className="form-label">Name:</label>  
            <input type="text" className='mb-3 form-control' name='name' ref={nameRef} onChange={validateForm} />

            <label className="form-label">Email:</label>
            <input type="text" className='form-control' name='email' ref={emailRef} onChange={validateForm} />
          </form>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-center'>
          <Button variant="danger" onClick={handleFinish}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleFinish}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> 
    </>
  )
}
