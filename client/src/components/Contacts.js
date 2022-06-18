import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { Dropdown, Card, Button } from 'react-bootstrap'
import axios from 'axios'

export default function Contacts({name}) {
  const [contactsList, setContactsList] = useState([])
  const navigate = useNavigate()

  const instance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
  })
  
  useEffect(()=>{
    const getContacts = async ()=>{
      const res = await instance.get('/contacts');
      await setContactsList(res.data)
    }
    getContacts()  
  }, [])

  

  return (
    <>
      <header className='dropdown-header d-flex justify-content-between' style={{ backgroundColor: "rgb(120, 120, 140)" }}>
        <h6 className='d-inline text-dark'>
          <NavLink to="profile" className='text-dark'>Mateo Pereira</NavLink>
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
      <main>
      <ul>
          {contactsList.map((contact, index) => (
            <li key={index} className="d-inline mx-3">
              <Card className='d-inline-block text-center mt-4' style={{background: '#99ea8d91', borderRadius: '10px'}}>
                <Card.Body style={{height: '150px'}}>
                  <Card.Title>
                    <h2>{contact.name}</h2>
                  </Card.Title>
                  <p className='text-muted mt-2 h6 secondary-text'>{contact.created_at.slice(0, 10)}</p>
                  <p className='h5 mt-4 secondary-text'>{contact.email}</p>
                </Card.Body>
                <Card.Footer style={{height: '70px'}} className='d-flex align-items-center'>
                  <Button className='btn btn-warning me-2'>Edit contact</Button>
                  <Button className='btn btn-danger'>Delete contact</Button>
                </Card.Footer>
              </Card>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
