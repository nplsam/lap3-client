import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../../assets/css/header.css'
import { useAuth } from '../../contexts/auth';
const styles = ({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none'});

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth()

  return (
    <>
        <header>
            <nav className="navbar">
              <div className="logo">Logo</div>
              <ul className="nav-links">
                 <li className="nav-link"><NavLink to="/home" style={styles}>Home</NavLink></li>
                <li className="nav-link"><NavLink to="/notes" style={styles}>Notes</NavLink></li>
                <li className="nav-link"><NavLink to="/planner" style={styles}>Planner</NavLink></li>
                <li className="nav-link"><NavLink to="/timer" style={styles}>Timer</NavLink></li>

                {isLoggedIn? null:<li className="nav-link"><NavLink to="/" style={styles}>Login/Register</NavLink></li>}

                {isLoggedIn? <button role='logout' className='logout-btn'>Logout</button> : null}
                
              </ul>
            </nav>
        </header>
        <Outlet />
    </>
  )
}

export default Header
