import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const HomePage = () => {

  
  return (
      <>
        <h1 className="welcome">Welcome to study buddy</h1>
  
        <div className="register-login-btn-container">
          <Link to="/register">
            <button className="register-btn">Register</button>
          </Link>

          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        </div>

        <div className="homepage-btn-container">
        <Link to="/notes">
          <button className="page-btn notes-btn">Notes</button>
        </Link>
        <Link to="/planner">
          <button className="page-btn planner-btn">Planner</button>
        </Link>
        <Link to="/timer">
          <button className="page-btn timer-btn">Timer</button>
        </Link>
        </div>




      </>
  )
}

export default HomePage
