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
