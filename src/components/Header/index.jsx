import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../../assets/css/header.css';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const styles = ({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' });

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, setUsername } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await axios.delete('http://localhost:5000/auth/logout', {
        headers:{Authorization: localStorage.token}
      });

      if (response.status == 200) {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        // Instead of login, I will delete username on logout (Valentin)
        setUsername('');
      } else {
        throw new Error('Failed to logout on server side. Try again.')
      }

    } catch (error) {
      console.log('Failed to logout: ' + error)
    }
  };

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="logo">Logo</div>
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
              <button role="logout" className="logout-btn" onClick={handleLogout}>
                Logout
                <span className="circle-overlay"></span>
              </button>
            ) : null}
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Header;