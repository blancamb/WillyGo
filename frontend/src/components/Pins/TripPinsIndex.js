import React from 'react'
import { getAllTripPins } from '../lib/api'
import PinCard from './PinCard'

class TripPinsIndex extends React.Component {

  state = {
    allPins: []
  }

  async componentDidMount() {
    try {
      const tripID = this.props.props.match.params.tripID
      const res = await getAllTripPins(tripID)
      this.setState({ allPins: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { allPins } = this.state

    return (
      <div className="main-page">
        <div className="pins-frame">
          {allPins.map(pin => (
            <PinCard {...pin} key={pin.id} />
            
          ))}
        </div>
      </div>
    )
  }
}

export default TripPinsIndex