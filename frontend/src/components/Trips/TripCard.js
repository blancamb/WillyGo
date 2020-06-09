import React from 'react'

import { Link } from 'react-router-dom'


const TripCard = ({ id, name, owner }) => (
  <>
    <Link to={`/mytrips/${id}`}>
      <div className="trip-card">
        <h3>{name}</h3>
        <h4>{owner.name}</h4>
      </div>
    </Link>
  </>
)

export default TripCard

