import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
const styles = ({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none'});

const Header = () => {
  return (
    <>
        <header>
            <nav>
            <NavLink to="/" style={styles}>Home</NavLink>
            <NavLink to="/notes" style={styles}>Notes</NavLink>
            <NavLink to="/planner" style={styles}>Planner</NavLink>
            <NavLink to="/timer" style={styles}>Timer</NavLink>
            </nav>
        </header>
        <Outlet />
    </>
  )
}

export default Header