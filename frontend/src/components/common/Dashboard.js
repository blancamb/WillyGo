import React from 'react'
import Select from 'react-select'


import { getAllUsers, createClub, createChat } from '../lib/api'
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
    users: []
  }

  async componentDidMount() {
    try {
      const res = await getAllUsers()
      this.setState({ users: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = event => {
    try {
      const club = { ...this.state.club, [event.target.name]: event.target.value }
      this.setState({ club })
    } catch (err) {
      console.log(err)
    }
  }

  //? Creates a club and the club's chat
  handleSubmit = async event => {
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

    if (!this.state.users) return null

    return (
      <>
        <h1> DASHBOARD</h1>
        <div>
          <h3>Create a club:</h3>
          <form onSubmit={this.handleSubmit}>
            <label>Name of club:</label>
            <input
              placeholder="name of the club"
              name="name"
              onChange={this.handleChange}
              value={club.name}
            />
            <button>submit</button>
          </form>
        </div>



        {/* <div>
          <label>Choose the members:</label>
          <Select
            options={this.state.users}
            isMulti
          />
        </div> */}



      </>
    )
  }
}

export default Dashboard