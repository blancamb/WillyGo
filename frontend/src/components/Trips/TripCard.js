import React from 'react'

import { Link } from 'react-router-dom'


const TripCard = ({ name, owner, link }) => (
  <>
    <Link to={link}>
      <div className="trip-card">
        <h3>{name}</h3>
        <h4>{owner.name}</h4>
      </div>
    </Link>
  </>
)

export default TripCard

