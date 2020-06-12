import React from 'react'
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom'
import NavbarLogged from './NavbarLogged'
import Logged from './Logged'
import Dashboard from './Dashboard'


class LoggedIn extends React.Component {

  state = {
    dashboardSel: false
  }

  render() {
    return (
      <>
        
        {this.state.dashboardSel ? <NavbarLogged /> : 
          <Logged />}

      </>
    )
  }

}

export default withRouter(LoggedIn)