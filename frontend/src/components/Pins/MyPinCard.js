import React from 'react'
import { Link } from 'react-router-dom'


const MyPinCard = ({ id, title, details, trip }) => (
  <>
    <div className="pin-card">
      <Link to={`/mypins/${id}`}>
        <div key={id}>
          <h4>{title}</h4>
          <h5>{details}</h5>
          <h5>{trip}</h5>
        </div>
      </Link>
    </div>
  </>
)

export default MyPinCard
