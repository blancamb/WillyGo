import React from 'react'

import { getAllUsers, createClub, createChat, getAllClubs  } from '../lib/api'
import { getUser, getUsername } from '../lib/auth'

class CreateClub extends React.Component {

  state = {
    username: '',
    club: {
      name: '',
      members: []
    },
    users: [],
    clubRequested: null
  }

  async componentDidMount() {
    try {
      const username = await getUsername()
      const res = await getAllUsers()
      const resClubs = await getAllClubs()
      this.setState({ username, users: res.data, allClubs: resClubs.data })
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

  render() {
    const { club } = this.state
   
    return (
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
    )
  }
}

export default CreateClub