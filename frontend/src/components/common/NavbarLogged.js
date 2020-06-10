import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const NavbarLogged = () => (
  <div className="navbar-logged">
    <Link to="/myclubs">my clubs </Link>
    <Link to="/mytrips">my trips </Link>
  </div>
)

export default withRouter(NavbarLogged)