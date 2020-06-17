import React from 'react'
import TripPinsIndex from '../Pins/TripPinsIndex'
import LeftNav from '../common/LeftNav'

class TripShow extends React.Component {


  render() {

    return (
      <div className="main">
        <div className="left-nav">
          <LeftNav />
        </div>
        <div className="central">

          <div className="page-title">
            <h1>trip show</h1>
          </div>
          <TripPinsIndex
            props={this.props}
          />
        </div>
      </div>
    )
  }
}
export default TripShow