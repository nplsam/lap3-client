import React, { useState }from 'react'
import { Link } from 'react-router-dom'
import '../HomePage/style.css'
import { Register, Login } from '../../components'
import { useAuth } from '../../contexts/auth'

const LoginRegister = () => {
    const [activeTab, setActiveTab] = useState('register');

    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };
  return (
    <>
        <h1 className="welcome">Welcome to study buddy</h1>

        <div className="form-container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => handleTabChange('register')}
            >
              Register
            </button>
            <button
              className={`tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => handleTabChange('login')}
            >
              Login
            </button>
          </div>

          {activeTab === 'register' ? (
            <div className="register-container">
              <Register />
            </div>
          ) : (
            <div className="login-container">
              <Login />
            </div>
          )}
        </div>
      </>
  )
}

export default LoginRegister
