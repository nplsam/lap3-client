import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../../assets/css/header.css'
import { useAuth } from '../../contexts/AuthContext';
const styles = ({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none'});

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth()

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('token');
  }

  return (
    <>
        <header>
            <nav className="navbar">
              <div className="logo">Logo</div>
              <div className="nav-container">
                <ul className="nav-links">
                  <li className="nav-link"><NavLink to="/" style={styles}>Home<span className="circle-overlay"></span></NavLink></li>
                  <li className="nav-link"><NavLink to="/notes" style={styles}>Notes<span className="circle-overlay"></span></NavLink></li>
                  <li className="nav-link"><NavLink to="/planner" style={styles}>Planner<span className="circle-overlay"></span></NavLink></li>
                  <li className="nav-link"><NavLink to="/timer" style={styles}>Pomodoro Timer<span className="circle-overlay"></span></NavLink></li>

                  {isLoggedIn? null:<li className="nav-link"><NavLink to="/loginregister" style={styles}>Login/Register<span className="circle-overlay"></span></NavLink></li>}

                  {isLoggedIn? <button role='logout' className='logout-btn' onClick={handleLogout}>Logout<span className="circle-overlay"></span></button> : null}
                  
                </ul>
              </div>
            </nav>
        </header>
        <Outlet />
    </>
  )
}

export default Header
