import React from 'react'
import { Routes, Route } from 'react-router-dom'
import * as Pages from './pages'
import { Header } from './components'
import './assets/css/app.css'

const App = () => {
  return (
      <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Pages.HomePage />}/>
            <Route path="/notes" element={<Pages.NotesPage />}/>
            
            <Route path="*" element={<Pages.NotFoundPage />}/>
          </Route>
      </Routes>
  )
}

export default App