import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import { logout, isAuthenticated } from '../lib/auth'
import NavbarLogged from './NavbarLogged'

class Navbar extends React.Component {

  //? LOGOUT

  handleLogout = () => {
    logout()
    this.props.history.push('/')
  }

  render() {
    console.log(isAuthenticated())

    return (
      <>
        <div className="navbar">
          <div className="links">
            <Link to="/"
              className="navbar-item logo"
              onClick={this.handleHideNavbar}
            >nem! </Link>

            {isAuthenticated() && <Link to="/dashboard"
              className="navbar-item"
              onClick={this.handleLoggedNavbar}
            >dashboard </Link>}

            {!isAuthenticated() &&
              <Link to="/register"
                className="navbar-item"
              >register </Link>}
            {!isAuthenticated() && <Link to="/login"
              className="navbar-item"
            >login </Link>}
          </div>
          {isAuthenticated() && <div className="logout">
            <button
              onClick={this.handleLogout}
            >logout</button>
          </div>}
        </div>
        {isAuthenticated() && <div className="navbar-logged">
          <NavbarLogged />
        </div>}
      </>
    )
  }

}

export default withRouter(Navbar)