import React from 'react'
import { getAllMyClubs } from '../lib/api'
import ClubCard from './ClubCard'

class MyClubsIndex extends React.Component {

  state = { myClubs: [] }

  async componentDidMount() {
    try {
      const res = await getAllMyClubs()
      const myClubsReverse = await res.data.reverse()
      this.setState({ myClubs: myClubsReverse })
    } catch (err) {
      console.log('error!!')
    }
  }

  render() {
    return (
      <>
        <h1>MY CLUBS INDEX</h1>
        <div className="my-clubs-index">
          {this.state.myClubs.map(club => (
            <ClubCard {...club} key={club.id}/>
          ))}
        </div>
      </>
    )
  }
}

export default MyClubsIndex