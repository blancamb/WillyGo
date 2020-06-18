import React from 'react'
import { Link } from 'react-router-dom'


const PinCard = ({ id, title, details, image, link, owner, trips }) => (
  <>
    <div className="pin-card">
      <Link to={`/mypins/${id}`}>
        <div className="pin" key={id}>
          <div className="pin-img">
            <img src={image} alt="sorry, it did not load!"/>
          </div>
          <h3>{title}</h3>
          <div>{trips.map(trip => (
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
