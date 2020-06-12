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
      <div className="main-page-c">
        <div className="page-title">
          <h1>my clubs</h1>
        </div>           
        <div className="my-clubs-index">
          {this.state.myClubs.map(club => (
            <ClubCard {...club} key={club.id} />
          ))}
        </div>

      </div>
    )
  }
}

export default MyClubsIndex