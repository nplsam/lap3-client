import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { useAuth } from '../../contexts/AuthContext'

const HomePage = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth()

  return (
      <>
        <h1 className="welcome">Welcome to Study Buddy!</h1>

        {isLoggedIn? 
          null: 
          (
            <>
            <div className='features'>
              <div className="notes">
                <h3>Organize Your Notes</h3>
                <p>Take and manage notes effortlessly. Stay organized and keep your study materials in one place.</p>
              </div>

              <div className="planner">
                <h3>Personalized Learning Planner</h3>
                <p>Customize your study plan for better results.</p>
              </div>

              <div className="pomodoro">
                <h3>Boost Productivity with Pomodoro</h3>
                <p>Enhance your focus and study efficiency with the Pomodoro Technique. Set timers and take productive breaks.</p>
              </div>
              </div>
              
              <Link to="/" style={{ textDecoration: 'none', color: '#424B54' }}><h2>Login to get started!</h2></Link>
              
            </>
          )
        }

        {isLoggedIn? (
          <div className="homepage-btn-container">
            <Link to="/notes">
              <button className="page-btn notes-btn">
                Organize Your Notes
              </button>
            </Link>
            <Link to="/planner">
              <button className="page-btn planner-btn">
                Personalized Learning Planner
              </button>
            </Link>
            <Link to="/timer">
              <button className="page-btn timer-btn">
                Boost Productivity with Pomodoro
              </button>
            </Link>
          </div>
           ) 
        : null 
        } 


      </>
  )
}

export default HomePage
