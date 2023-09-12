import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import { TimerProvider } from './contexts/TimerContext'
import { NotesProvider } from './contexts/NotesContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotesProvider>
    <TimerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TimerProvider>
    </NotesProvider>
  </React.StrictMode>,
)
