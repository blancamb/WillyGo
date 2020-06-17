import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import ChatBox from '../Chat/ChatBox'


class LeftNav extends React.Component {

  render() {
    console.log(this.props.match.params)
    return (
      <>
        <h3>Trip Navbar</h3>
        <ChatBox
          clubID={this.props.match.params.clubID}
        />
      </>
    )
  }
}

export default withRouter(LeftNav)