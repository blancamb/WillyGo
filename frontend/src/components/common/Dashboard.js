import React from 'react'
import Select from 'react-select'


import { getAllUsers, createClub, createChat, getAllRequests, updateClub, getAllClubs } from '../lib/api'
import { getUser } from '../lib/auth'

class Dashboard extends React.Component {


  state = {
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
      const res = await getAllUsers()
      const resReqs = await getAllRequests()
      const resClubs = await getAllClubs()
      this.setState({ users: res.data, requests: resReqs.data, allClubs: resClubs.data })
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

  handleAcceptRequest = async event => {
    event.preventDefault()
    try {
      const clubID = 1
      const club = this.state.allClubs.filter(club => (club.id === clubID))
      console.log(club)
      await updateClub({ ...club[0], members: [1, 2, 3, 4] }, clubID)
    } catch (err) {
      console.log(err)
    }
  }

  handleDeclineRequest = async event => {
    event.preventDefault()
    try {

    } catch (err) {
      console.log(err)
    }
  }



  render() {
    console.log(this.state.requests)
    console.log(this.state.allClubs)

    const { club } = this.state

    if (!this.state.users) return null

    return (
      <>
        <h1> DASHBOARD</h1>
        <div>
          <h3>Create a club:</h3>
          <form onSubmit={this.handleSubmitCreateClub}>
            <label>Name of club:</label>
            <input
              placeholder="name of the club"
              name="name"
              onChange={this.handleChangeCreateClub}
              value={club.name}
            />
            <button>submit</button>
          </form>
        </div>

        <div>
          <h3>Club Requests:</h3>
          <div className="requests-frame">
            {this.state.requests.map(request => (
              <div key={request.id}>
                <h4>{request.sender.username} wants you to join a club</h4>
                <button
                  onClick={this.handleAcceptRequest}
                >accept</button>
                <button
                  onClick={this.handleDeclineRequest}
                >decline</button>
              </div>
            ))}
          </div>
        </div>


      </>
    )
  }
}

export default Dashboard