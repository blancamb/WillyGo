import React from 'react'

import { Link } from 'react-router-dom'

const ClubCard = ({ created_trips, id, name, members }) => {
  return (
    <>
      <Link to={`/myclubs/${id}`}>
        <div className="club-card">
          <h3>{name}</h3>
          <div>{members.map(member =>(
            <h4 key={member.username}>{member.username}</h4>
          ))}</div>
        </div>
      </Link>
    </>
  )
}

export default ClubCard