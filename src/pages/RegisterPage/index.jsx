import React from 'react';
import { Link } from 'react-router-dom'

import { Register } from '../../components';


const RegisterPage = () => {
  return (
    <div className="register-container"> 
      <Register />
      <Link to="/login">
        <button>Already have an account? Login</button>
      </Link>
    </div>
  )
}

export default RegisterPage
