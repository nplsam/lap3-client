import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../../assets/css/header.css';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const styles = ({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' });

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, setUsername } = useAuth();

  const handleLogout = async () => {
    const response = await fetch ('http://localhost:5000/auth/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json',
        'Authorization': localStorage.token
      }
    })

    if(!response.ok) {
      throw new Error('Failed to logout')
    }

    localStorage.removeItem('token');
    // Instead of login, I will delete username on logout (Valentin)
    setUsername('');
    setIsLoggedIn(false)
  };

  useEffect(() => {
    setIsLoggedIn(localStorage.token ? true : false)
  }, [isLoggedIn])

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="logo"></div>
          <ul className="nav-links">
            <li className="nav-container">
              <NavLink to="/" style={styles}>
                <span className="nav-text">Home</span>
                <span className="circle-overlay"></span>
              </NavLink>
            </li>
            <li className="nav-container">
              <NavLink to="/notes" style={styles}>
                <span className="nav-text">Notes</span>
                <span className="circle-overlay"></span>
              </NavLink>
            </li>
            <li className="nav-container">
              <NavLink to="/planner" style={styles}>
                <span className="nav-text">Planner</span>
                <span className="circle-overlay"></span>
              </NavLink>
            </li>
            <li className="nav-container">
              <NavLink to="/timer" style={styles}>
                <span className="nav-text">Pomodoro Timer</span>
                <span className="circle-overlay"></span>
              </NavLink>
            </li>

            {isLoggedIn ? null : (
              <li className="nav-container">
                <NavLink to="/loginregister" style={styles}>
                  <span className="nav-text">Login/Register</span>
                  <span className="circle-overlay"></span>
                </NavLink>
              </li>
            )}

            {isLoggedIn ? (
              <li className="nav-container">
                <button role="logout" className="logout-btn" onClick={handleLogout}>
                  <span className="nav-text">Logout</span>
                  <span className="circle-overlay"></span>
                </button>
              </li>
            ) : null}
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
