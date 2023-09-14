import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { useAuth } from '../../contexts/AuthContext'

const Login = () => {
  const navigate = useNavigate()

  const { isLoggedIn, setIsLoggedIn, username, setUsername, password, setPassword } = useAuth()
  const [message, setMessage] = useState('')

  function handleUsername(e) {
    setUsername(e.target.value.toString())
  }

  function handlePassword(e) {
    setPassword(e.target.value.toString())
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (username.length > 0 && password.length > 0) {
      try {
        const response = await axios.post('http://localhost:5000/auth/login', {
          username: username,
          password: password,
        });
  
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          setIsLoggedIn(true);
          setUsername('');
          setPassword('');
          navigate('/');
        } 

      } catch (err) {
        setUsername('');
        setPassword('');
        setMessage('Invalid username or password.');
        setTimeout(() => {
          setMessage('');
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
