import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Logout() {
  const navigate = useNavigate()

  const instance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
  })

  useEffect(()=>{
    const exit = async ()=>{
      await instance.get('/logout')
      navigate('/signin')
    }
    exit()
  })

  return (
    <h1>Goodbye!</h1>
  )
}
