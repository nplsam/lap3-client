import React from 'react';
import { Link } from 'react-router-dom'

import { Login } from '../../components';


const LoginPage = () => {
  return (
    <div className="login-container"> 
      <Login />
      <Link to="/register">
        <button>Don't have an account yet? Register</button>
      </Link>
    </div>
  )
}

export default LoginPage
