import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { Dropdown, Card, Button } from 'react-bootstrap'
import axios from 'axios'
import AddModal from './Add'
import EditModal from './Edit'

export default function Contacts({name, setName}) {
  const [contactsList, setContactsList] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const navigate = useNavigate()

  const instance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
  })
  
  useEffect(()=>{ // Get contacts or redirect to sign in if not authenticated.
    const getContacts = async ()=>{
      try {
        const res = await instance.get('/contacts');
        setContactsList(res.data);
        const prof = await instance.get('/profile')
        setName(prof.data.fullname)
      }
      catch(err){
        navigate('/signin')
      }
    }
    getContacts()  
  }, [setContactsList, contactsList])

  const deleteContact = async (id)=>{
    const confirmation = window.confirm('Are you sure you want delete this contact?')
    if (confirmation) {
      try {
        await instance.post(`/contacts/delete/${id}`)
      } catch(err){}  
    }
    
  }

  

  return (
    <>
      <header className='dropdown-header d-flex justify-content-between' style={{ backgroundColor: "rgb(120, 120, 140)" }}>
        <h6 className='d-inline text-dark'>
          <NavLink to="/profile" className='text-dark'>{name}</NavLink>
        </h6>
        <Button className='btn btn-success' style={{fontSize: '30px'}} onClick={()=>setShowAddModal(!showAddModal)}>
          Create new contact
        </Button>
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
      <ul className='d-flex justify-content-center flex-wrap'>
          {contactsList.map((contact) => (
              <li key={contact.contactId} className="d-inline mx-3">
                <Card className='d-inline-block text-center mt-4' style={{background: '#99ea8d91', borderRadius: '10px'}}>
                  <Card.Body style={{height: '150px'}}>
                    <Card.Title>
                      <h2>{contact.name}</h2>
                    </Card.Title>
                    <p className='text-muted mt-2 h6 secondary-text'>{contact.created_at.slice(0, 10)}</p>
                    <p className='h5 mt-4 secondary-text'>{contact.email}</p>
                  </Card.Body>
                  <Card.Footer style={{height: '70px'}} className='d-flex align-items-center'>
                    <Button className='btn btn-warning me-2' onClick={()=>setShowEditModal(!showEditModal)}>Edit contact</Button>
                    <Button className='btn btn-danger' onClick={()=>deleteContact(contact.contactId)}>Delete contact</Button>
                  </Card.Footer>
                </Card>
                {showEditModal ? (
                  <EditModal
                    show={showEditModal}
                    setShow={setShowEditModal}
                    name={contact.name}
                    email={contact.email}
                    id={contact.contactId}
                  />
                ) : null}
              </li>
          ))}
          {showAddModal ? (
            <AddModal
              show={showAddModal}
              setShow={setShowAddModal}
            />
          ) : null}
        </ul>
      </main>
    </>
  )
}
