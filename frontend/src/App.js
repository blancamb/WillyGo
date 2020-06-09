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
import ChatBox from './components/Chat/ChatBox'
import Dashboard from './components/common/Dashboard'



const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route path="/mytrips/:tripID" component={TripShow} />
        <Route path="/mytrips" component={MyTripsIndex} />
        <Route path="/myclubs/:clubID/chat" component={ChatBox} />
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

export default App