import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/common/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Navbar from './components/common/Navbar'
import MyClubsIndex from './components/myClubs/MyClubsIndex'
import ClubShow from './components/myClubs/ClubShow'
import ClubTripIndex from './components/Trips/ClubTripsIndex'
import MyTripsIndex from './components/Trips/MyTripsIndex'
import TripShow from './components/Trips/TripShow'
import Dashboard from './components/common/Dashboard'
import myPinsIndex from './components/Pins/MyPinsIndex'
import PinShow from './components/Pins/PinShow'



class App extends React.Component {



  render() {

    return (
      <BrowserRouter>
        <div className="navbars">
          <Navbar />
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/mypins/:id" component={PinShow} />
          <Route path="/mypins" component={myPinsIndex} />
          <Route path="/mytrips/:tripID" component={TripShow} />
          <Route path="/mytrips" component={MyTripsIndex} />
          <Route path="/myclubs/:clubID/trips" component={ClubTripIndex} />
          <Route path="/myclubs/:clubID" component={ClubShow} />
          <Route path="/myclubs" component={MyClubsIndex} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App

