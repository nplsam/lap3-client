import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../../assets/css/header.css'
const styles = ({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none'});

const Header = () => {
  return (
    <>
        <header>
            <nav className="navbar">
              <div className="logo">Logo</div>
              <ul className="nav-links">
                <li className="nav-link"><NavLink to="/" style={styles}>Home</NavLink></li>
                <li className="nav-link"><NavLink to="/notes" style={styles}>Notes</NavLink></li>
                <li className="nav-link"><NavLink to="/planner" style={styles}>Planner</NavLink></li>
                <li className="nav-link"><NavLink to="/timer" style={styles}>Timer</NavLink></li>
              </ul>
            </nav>
        </header>
        <Outlet />
    </>
  )
}

export default Header