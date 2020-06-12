import React from 'react'

import { getAllUsers, createClub, createChat, getAllRequests, updateClub, getAllClubs, deleteRequest } from '../lib/api'
import { getUser, getUsername } from '../lib/auth'
import CreatePin from '../Pins/CreatePin'

class Dashboard extends React.Component {


  state = {
    username: '',
    club: {
      name: '',
      members: []
    },
    chat: {
      club: ''
    },
    users: [],
    requests: [],
    allClubs: [],
    clubRequested: null
  }

  async componentDidMount() {
    try {
      const username = await getUsername()
      const res = await getAllUsers()
      const resReqs = await getAllRequests()
      const resClubs = await getAllClubs()
      this.setState({ username, users: res.data, requests: resReqs.data, allClubs: resClubs.data })
    } catch (err) {
      console.log(err)
    }
  }


  //? CREATE CLUB handlers

  handleChangeCreateClub = event => {
    try {
      const club = { ...this.state.club, [event.target.name]: event.target.value }
      this.setState({ club })
    } catch (err) {
      console.log(err)
    }
  }

  //? Creates a club and the club's chat

  handleSubmitCreateClub = async event => {
    event.preventDefault()
    try {
      const user = getUser()
      const res = await createClub({ ...this.state.club, members: [user] })
      console.log(res.data)
      const clubID = res.data.id
      await createChat({ ...this.state.chat, club: clubID })
      this.props.history.push('/myclubs')
    } catch (err) {
      console.log(err)
    }
  }

  //? RECEIVE AND ACCEPT/DECLINE CLUB REQUESTS

  handleAcceptRequest = async (event) => {
    event.preventDefault()
    try {
      const clubID = parseFloat(event.target.value)
      const user = getUser()
      const club = this.state.allClubs.filter(club => (club.id === clubID))
      const members = club[0].members.map(member => member.id)
      const membersUpdated = [...members, user]
      const reqID = event.target.name
      await updateClub({ ...club[0], members: membersUpdated }, clubID)
      await deleteRequest(reqID)
      const resReqs = await getAllRequests()
      this.setState({ requests: resReqs.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleDeclineRequest = async event => {
    event.preventDefault()
    try {
      const reqID = event.target.name
      await deleteRequest(reqID)
      const resReqs = await getAllRequests()
      this.setState({ requests: resReqs.data })
    } catch (err) {
      console.log(err)
    }
  }



  render() {
    const { club, username, requests } = this.state

    if (!this.state.users) return null
    if (!this.state.allClubs) return null

    return (
      <div className="main-page dashboard">
        <div className="page-title">
          <h1>{username}´s dashboard</h1>
        </div>   
        <div className="dashboard-widgets">
          <div className="create-club">
            <h3>create a club</h3>
            <form onSubmit={this.handleSubmitCreateClub}>
              <input
                placeholder="name of the club"
                name="name"
                onChange={this.handleChangeCreateClub}
                value={club.name}
              />
              <button>create!</button>
            </form>
          </div>
          <CreatePin />
          <div>
            <div className="requests-frame">
              <h3>requests</h3>
              <div>
                {requests.length === 0 ? <h5>You have no pending requests</h5> :
                  requests.map(request => (
                    <div key={request.id}>
                      <p><strong>from {request.sender.username}:</strong></p>
                      <p>{request.message}</p>
                      <button
                        onClick={this.handleAcceptRequest}
                        value={request.club}
                        name={request.id}
                      >accept</button>
                      <button
                        onClick={this.handleDeclineRequest}
                        name={request.id}
                      >decline</button>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>          
        </div>
      </div>
    )
  }
}

export default Dashboard