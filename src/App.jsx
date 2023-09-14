import React from 'react'
import { Routes, Route } from 'react-router-dom'
import * as Pages from './pages'
import { Header } from './components'
import ProtectedRoute from './routes'

const App = () => {
  return (
      <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Pages.HomePage />}/>
            <Route path="loginregister" element={<Pages.LoginRegister />}/>

            <Route path="/notes" element={<Pages.NotesPage />}/>

            <Route path="/timer" element={<ProtectedRoute redirectTo="/loginregister" />} >
              <Route index element={<Pages.TimerPage />}/>
            </Route>

            <Route path="*" element={<Pages.NotFoundPage />}/>
          </Route>

          <Route path="/timer" element={<ProtectedRoute redirectTo="/loginregister" />} >
            <Route index element={<Pages.TimerPage />}/>
          </Route>
      </Routes>
  )
}

export default App
