import React from 'react'

import { getAllClubTrips } from '../lib/api'
import TripCard from './TripCard'

class ClubTripIndex extends React.Component {

  state = { 
    clubTrips: [],
    clubID: ''
  }

  async componentDidMount() {

    try {
      const clubID = this.props.props.match.params.clubID
      const res = await getAllClubTrips(clubID)
      const tripsReverse = await res.data.reverse()
      this.setState({ clubID, clubTrips: tripsReverse })

    } catch (err) {
      console.log(err)
    }
  }


  render() {
    if (!this.state.clubTrips) return null
    if (!this.state.clubID) return null
    console.log(this.state.clubID)
    return (

      <div className="club-trip-index"
      >
        {this.state.clubTrips.map(trip => (
          <TripCard {...trip}
            key={trip.id}
            link={`/myclubs/${this.state.clubID}/trips/${trip.id}`} />
        ))}
      </div>

    )
  }
}


export default ClubTripIndex

  