import React from 'react'
import { Link, withRouter } from 'react-router-dom'


const LeftNav = () => {
  return (
    <>
      <h1>LEFT NAV</h1> 
      <Link to="/myclubs">my clubs </Link>
      <Link to="/mytrips">my trips </Link>
    </>
  )
}

export default withRouter(LeftNav)