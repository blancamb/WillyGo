import React from 'react'
import { getAllMyPins } from '../lib/api'
import MyPinCard from './PinCard'
import PinCreate from './CreatePin'

class TripPinsIndex extends React.Component {

  state = {
    allPins: []
  }

  async componentDidMount() {
    try {
      const res = await getAllMyPins()
      this.setState({ allPins: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { allPins } = this.state
    if (!allPins) return null
    return (
      <div className="main-page">
        <div className="page-title">
          <h1>my pins</h1>
        </div>
        <div className="pins-and-create">
          <div className="pins-frame">
            {allPins.map(pin => (
              <MyPinCard {...pin} key={pin.id} />

            ))}
          </div>
          <div>
            <PinCreate />
          </div>
        </div>

      </div>
    )
  }
}

export default TripPinsIndex