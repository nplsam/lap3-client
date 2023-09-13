import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { useAuth } from '../../contexts/auth'


const Login = () => {
  const navigate = useNavigate()

  const { isLoggedIn, setIsLoggedIn, username, setUsername, password, setPassword } = useAuth()
  const [message, setMessage] = useState('')

  function handleUsername(e) {
    setUsername(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (username.length > 0 && password.length > 0) {
      try {
        await axios.get('url', {
          username: username,
          password: password,
        });

        setUsername('')
        setPassword('')
        setIsLoggedIn(true)
        navigate('/home')

        // setMessage('Login successful');
        // setTimeout(() => {
        //   setMessage('')
        // }, 3000);

      } catch (err) {
        setUsername('')
        setPassword('')
        setMessage('Incorrect credentials.');
        setTimeout(() => {
          setMessage('')
        }, 2000);
      }
    }
  }

  return (
    <>
      <form
        aria-label='login form'
        role="login"
        onSubmit={handleSubmit}
      > 
        <label>Username: </label>
        <input
          type="text"
          id="username"
          onChange={handleUsername}
          value={username}
          placeholder='username'
          required
        />

        <label>Password: </label>
        <input
          type="password"
          id="password"
          onChange={handlePassword}
          value={password}
          placeholder='password'
          required
        />

        <input className='login' type="submit" value="Login" />
        {message && <p>{message}</p>}

      </form>
    </>
  )
}

export default Login
