import React, { useState } from 'react'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
        setMessage('Login successful');
        setTimeout(() => {
          setMessage('')
        }, 3000);

      } catch (err) {
        setUsername('')
        setPassword('')
        setMessage('Login failed');
        setTimeout(() => {
          setMessage('')
        }, 3000);
      }
    }
  }

  return (
    <>
      <h3>Login</h3>
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
