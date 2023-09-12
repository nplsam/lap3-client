import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import { TimerProvider } from './contexts'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TimerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TimerProvider>
  </React.StrictMode>,
)
