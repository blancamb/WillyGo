import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import { getUsername } from '../lib/auth'

const Navbar = () => (
  <div className="navbar">
    <Link to="/home">home </Link>
    <Link to="/dashboard">dashboard </Link>
    <Link to="/register">register </Link>
    <Link to="/login">login </Link>
    <h5> Hi {getUsername()}!</h5>
  </div>
)

export default withRouter(Navbar)