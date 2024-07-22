import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg border-bottom fixed-top shadow-sm" style={{ backgroundColor: "#FFF" }}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src='Media/Images/logo.svg' alt='logo' className="logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item mx-3 ">
              <Link className="nav-link p-2 rounded" to="/signup">Login/Signup</Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link p-2 rounded" to="/about">About</Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link p-2 rounded" to="/products">Products</Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link p-2 rounded" to="/pricing">Pricing</Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link p-2 rounded" to="/support">Support</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
