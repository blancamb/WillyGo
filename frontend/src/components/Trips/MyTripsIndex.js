import React from 'react'

import { getAllMyTrips } from '../lib/api'
import TripCard from './TripCard'

class MyTripsIndex extends React.Component {


  state = { myTrips: [] }

  async componentDidMount() {
    try {
      const res = await getAllMyTrips()
      const tripsReverse = await res.data.reverse()
      this.setState({ myTrips: tripsReverse })
    } catch (err) {
      console.log(err)
    }
  }



  render() {
    return (
      <div className="main-page">
        <div className="page-title">
          <h1>my trips</h1>
        </div>           
        <div className="my-trips-index">
          {this.state.myTrips.map(trip => (
            <TripCard {...trip} key={trip.id} />
          ))}
        </div>
      </div>
    )
  }
}

export default MyTripsIndex