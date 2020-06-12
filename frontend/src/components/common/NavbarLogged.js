import React from 'react'
import { Link } from 'react-router-dom'

const NavbarLogged = () => (
  <div className="links">
    <Link to="/myclubs"
      className="navbar-item"
    >my clubs </Link>
    <Link to="/mytrips"
      className="navbar-item"
    >my trips </Link>
    <Link to="/mypins"
      className="navbar-item"
    >my pins </Link>

  </div>
)

export default NavbarLogged