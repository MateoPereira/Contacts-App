import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Profile (){
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const instance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
  })

  useEffect(()=>{ fdsadsafsadfdsf// Get the user name or redirect to sign in if not authenticated.
    const getName = async ()=>{
      const res = await instance.get('/profile')
      console.log(res.data)
      setName(res.data.fullname)
    }
    getName()
  }, [instance, navigate])
  return(
    <>
      <h1 className='text-center primary-text'>Welcome {name}!</h1>
    </>
  )
}