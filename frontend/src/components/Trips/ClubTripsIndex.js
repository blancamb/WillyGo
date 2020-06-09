import React from 'react'

import { getAllClubTrips } from '../lib/api'
import TripCard from './TripCard'

class ClubTripIndex extends React.Component {

  state = { clubTrips: [] }

  async componentDidMount() {

    try {
      const clubID = this.props.props.match.params.clubID
      const res = await getAllClubTrips(clubID)
      this.setState({ clubTrips: res.data })

    } catch (err) {
      console.log(err)
    }
  }


  render() {
    if (!this.state.clubTrips) return null
    if (!this.props) return null
    return (
      <>
        <div className="club-trip-index"
        >
          {this.state.clubTrips.map(trip => (
            <TripCard {...trip} key={trip.id} />
          ))}
        </div>
      </>
    )
  }
}


export default ClubTripIndex