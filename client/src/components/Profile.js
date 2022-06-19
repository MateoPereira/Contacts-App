import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import axios from 'axios'

export default function Profile ({name, setName}){
  const [contactsNumber, setContactsNumber] = useState(0)
  const navigate = useNavigate()

  const instance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
  })

  useEffect(()=>{ // Get the user name or redirect to sign in if not authenticated.
    const getName = async ()=>{
      try {
        const res = await instance.get('/profile')
        setName(res.data.fullname)
      } catch(err) {
        navigate('/signin')
      }
    }
    const getContactsNumber = async ()=>{
      try {
        const res = await instance.get('/contacts');
        setContactsNumber(res.data.length)
      }
      catch (err){}
    }
    getName()
    getContactsNumber()
  }, [instance, navigate, setName])
  return(
    <>
      <header className='dropdown-header d-flex justify-content-between' style={{ backgroundColor: "rgb(120, 120, 140)" }}>
        <h6 className='d-inline text-dark'>
          <NavLink to="profile" className='text-dark'>{name}</NavLink>
        </h6>
        <Dropdown className='d-inline'>
          <Dropdown.Toggle className='dropdown border-0 text-dark' style={{background: 'transparent'}}>
            <i className="fa-solid fa-bars"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu style={{background: '#6198ff52'}}>
            <Dropdown.Item className='dropdown-item'>
              <NavLink 
              to='/profile' 
              className={({ isActive }) => "text-dark " + (isActive ? "border-bottom border-dark" : null)}>
                Profile
                <i className="fa-solid fa-user ms-3"></i>
              </NavLink>  
            </Dropdown.Item>
            <Dropdown.Item className='dropdown-item'>
              <NavLink 
              to='/contacts' 
              className={({ isActive }) => "text-dark " + (isActive ? "border-bottom border-dark" : null)}>
                Contacts
                <i className="fa-solid fa-address-card ms-3"></i>
              </NavLink>
            </Dropdown.Item>
            <Dropdown.Item className='dropdown-item'>
              <NavLink 
                to='/logout' 
                className={({ isActive }) => "text-dark " + (isActive ? "border-bottom border-dark" : null)}>
                  Log out
                  <i className="fa-solid fa-arrow-right-from-bracket ms-3"></i>
              </NavLink>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>  
      </header>
      <h1 className='text-center primary-text' style={{margin: '170px 0 100px 0'}}>Welcome {name}!</h1>
      <h2 className='text-center secondary-text' style={{fontSize: '43px'}}>You have {contactsNumber} contacts</h2>
      <button className='btn btn-warning mx-auto d-block mt-5 secondary-text' style={{fontSize: '27px'}}>
        <NavLink to="/contacts" className='text-dark'>
          Go see your contacts!
        </NavLink>
      </button>
    </>
  )
}