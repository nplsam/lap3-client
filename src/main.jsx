import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import { TimerProvider } from './contexts'
import { AuthProvider } from './contexts/auth'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <TimerProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TimerProvider>
    </AuthProvider>
  </React.StrictMode>,
)
