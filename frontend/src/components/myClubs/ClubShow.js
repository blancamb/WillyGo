import React from 'react'
import Select from 'react-select'

import { createTrip, getAllUsers, createRequest } from '../lib/api'
import ClubTripIndex from '../Trips/ClubTripsIndex'
import { getUser } from '../lib/auth'
import LeftNav from '../common/LeftNav'
import CreatePin from '../Pins/CreatePin'

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
    usernames: [],
    userInvited: 1,
    request: {
      message: '',
      sender: '',
      recipient: '',
      club: null
    }
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

  //? EVENT LISTENERS FOR CREATING A TRIP

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


  //? EVENT LISTENERS FOR SENDING A CLUB INVITE

  handleUserSelect = (event) => {
    const request = { ...this.state.request, recipient: event.name }
    this.setState({ request })
  }
  handleAddMessageChange = event => {
    event.preventDefault()
    try {
      const request = { ...this.state.request, [event.target.name]: event.target.value }
      this.setState({ request })
    } catch (err) {
      console.log(err)
    }
  }
  handleInviteUser = async () => {
    try {
      const sender = getUser()
      const recipient = this.state.request.recipient
      const message = this.state.request.message
      const club = parseFloat(this.props.match.params.clubID)
      await createRequest({ ...this.state.request, sender, recipient, message, club })
    } catch (err) {
      console.log(err)
    }

  }

  render() {
    if (!this.state.users) return null
    const { trip, chat, request } = this.state
    const options = this.state.users.map(user => {
      return {
        value: user.username,
        label: user.username,
        name: user.id
      }
    }
    )

    return (
      <>
        <div className="main">
          <div className="left-nav">
            <LeftNav
              props={chat.club} />
          </div>
          <div className="central">
            <div className="page-title">
              <h1>club</h1>
            </div>
            <div className="club-trip-index-c">
              <ClubTripIndex
                props={this.props}
              />

            </div>
            <div className="add-widgets">
              <div className="create-a-trip">
                <h3>create a trip</h3>
                <form onSubmit={this.handleSubmit}>
                  <input
                    placeholder="name of the trip"
                    name="name"
                    onChange={this.handleChange}
                    value={trip.name}
                  />
                  <button>submit</button>
                </form>
              </div>

              <div className="add-member">
                <h3>add a member</h3>
                <form
                  onSubmit={this.handleInviteUser}>
                  <Select
                    options={options}
                    placeholder='select a user'
                    onChange={this.handleUserSelect}
                    name="recipient"
                  />
                  <input
                    placeholder="your message"
                    name="message"
                    onChange={this.handleAddMessageChange}
                    value={request.message}
                  />
                  <button>invite!</button>

                </form>

              </div>
              <CreatePin />
            </div>
          </div>
        </div>

      </>
    )
  }
}
export default ClubShow