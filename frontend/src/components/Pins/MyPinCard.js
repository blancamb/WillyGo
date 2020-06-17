import React from 'react'
import { Link } from 'react-router-dom'


const MyPinCard = ({ id, title, details, trips }) => (
  <>
    <div className="pin-card">
      <Link to={`/mypins/${id}`}>
        <div key={id}>
          <h4>{title}</h4>
          <h5>{details}</h5>
          {trips.map(trip => {
            <h5>{trip.name}</h5>
          })}
        </div>
      </Link>
    </div>
  </>
)

export default MyPinCard
