import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const Navbar = () => (
  <div className="navbar">
    <Link to="/home">home </Link>
    <Link to="/dashboard">dashboard </Link>
    <Link to="/register">register </Link>
    <Link to="/login">login </Link>
  </div>
)

export default withRouter(Navbar)