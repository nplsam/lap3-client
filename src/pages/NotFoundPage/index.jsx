import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <main>
        <h1 className="not-found">404: Page not found</h1>
        <Link to="/" className="return-home">Return Home</Link>
    </main>
  )
};

export default NotFoundPage