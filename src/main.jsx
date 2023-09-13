import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import { PlannerProvider, TimerProvider } from './contexts'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TimerProvider>
    <PlannerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PlannerProvider>
    </TimerProvider>
  </React.StrictMode>,
)
