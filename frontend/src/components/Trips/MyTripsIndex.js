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
      <>
        <h1>MY TRIPS INDEX</h1>
        <div className="my-trips-index">
          {this.state.myTrips.map(trip => (
            <TripCard {...trip} key={trip.id} />
          ))}
        </div>
      </>
    )
  }
}

export default MyTripsIndex