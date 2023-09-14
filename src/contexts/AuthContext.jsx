import axios from "axios";
import React, { useState, useContext, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // Function to get username
  const getUsername = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/login', {
        headers: {
          Authorization : localStorage.token
        }
      });

      if(!response.ok) {
        throw new Error('Failed to logout')
      }

      const data = await response.json()

      return data
      
    } catch (error) {
      console.error('Failde to get username: ', error)
    }
  }

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.token ? true : false)
  const [username, setUsername] = useState(localStorage.token ? getUsername : '')
  const [password, setPassword] = useState('')

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUsername, password, setPassword }}>
        {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
