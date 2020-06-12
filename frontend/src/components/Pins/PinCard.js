import React from 'react'
import { Link } from 'react-router-dom'


const PinCard = ({ id, title, details, image, link, owner, trips }) => (
  <>
    <div className="pin-card">
      <Link to={`/mypins/${id}`}>
        <div key={id}>
          <h3>{title}</h3>
          <img src={image} />
          <div>trips:{trips.map(trip => (
            <h5 key={trip.id}> <strong>{trip.name}</strong></h5>
          ))}</div>
          {/* <h4>{details}</h4>
          <a href={link}/> */}
          {/* <h5>added by <strong>{owner.username}</strong></h5> */}
        </div>
      </Link>
    </div>
  </>
)

export default PinCard
