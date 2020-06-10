import React from 'react'
import Select from 'react-select'

import { createTrip, getAllUsers } from '../lib/api'
import ClubTripIndex from '../Trips/ClubTripsIndex'
import ChatBox from '../Chat/ChatBox'

class ClubShow extends React.Component {

  state = {
    trip: {
      name: '',
      owner: ''
    },
    chat: {
      club: ''
    },
    users: [],
    usernames: []
  }

  async componentDidMount() {
    try {
      const res = await getAllUsers()
      this.setState({ users: res.data })
      res.data.map(user => {
        this.state.usernames.push(user.username)
      })
    } catch (err) {
      console.log(err)
    }
  }


  handleChange = event => {
    try {
      const trip = { ...this.state.trip, [event.target.name]: event.target.value }
      this.setState({ trip })
    } catch (err) {
      console.log(err)
    }
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const clubID = this.props.match.params.clubID
      const res = await createTrip({ ...this.state.trip, owner: clubID })
      this.props.history.push(`/mytrips/${res.data.id}`)
    } catch (err) {
      console.log(err)
    }
  }


  render() {
    if (!this.state.users) return null

    const { trip, usernames } = this.state
    return (
      <>
        <h1> CLUB SHOW PAGE</h1>
        <ClubTripIndex
          props={this.props}
        />

        <div>
          <h3>Create a trip:</h3>
          <form onSubmit={this.handleSubmit}>
            <label>Name of trip:</label>
            <input
              placeholder="name of the trip"
              name="name"
              onChange={this.handleChange}
              value={trip.name}
            />
            <button>submit</button>
          </form>
        </div>

        <div>
          <h3>Add a member to the club:</h3>
          {/* <form onSubmit={handleAddMemberSubmit}> */}
          <form>
            <label>Who do you want to add?</label>
            <input
              type="search"
            >
            </input>

          </form>
        </div>

        <ChatBox
          props={this.props}
        />
      </>
    )
  }
}
export default ClubShow