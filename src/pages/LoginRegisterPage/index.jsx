import React, { useState }from 'react'
import './style.css'
import { Register, Login } from '../../components'
import { useAuth } from '../../contexts/AuthContext'

const LoginRegister = () => {
    const [activeTab, setActiveTab] = useState('login');

    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };
  return (
    <>
      <div role='form' className="form-container">
        <div role='tabs' className="tabs">
          <button role='register-tab'
            className={`tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => handleTabChange('register')}
          >
            Register
          </button>
          <button role='login-tab'
            className={`tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => handleTabChange('login')}
          >
            Login
          </button>
        </div>

        {activeTab === 'register' ? (
          <div role='register-form'className="register-container">
            <Register />
          </div>
        ) : (
          <div role='login-form' className="login-container">
            <Login />
          </div>
        )}
      </div>
    </>
  )
}

export default LoginRegister
