import React from 'react'
import { withRouter } from 'react-router-dom'
import ChatBox from '../Chat/ChatBox'


class LeftNav extends React.Component {

  render() {
    return (
      <>
        <ChatBox
          clubID={this.props.match.params.clubID}
        />
      </>
    )
  }
}

export default withRouter(LeftNav)