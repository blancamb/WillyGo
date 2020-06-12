import React from 'react'
import Select from 'react-select'
import { createPin, getAllMyTrips } from '../lib/api'
import { getUser } from '../lib/auth'

class CreatePin extends React.Component {
  state = {
    pin: {
      title: '',
      details: '',
      image: '',
      link: '',
      owner: '',
      trips: []
    },
    myTrips: []
  }

  async componentDidMount() {
    try {
      const res = await getUser()
      const pin = { ...this.state.pin, owner: res }
      const myTrips = await getAllMyTrips()
      this.setState({ pin, myTrips })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = event => {
    try {
      const pin = { ...this.state.pin, [event.target.name]: event.target.value }
      this.setState({ pin })
    } catch (err) {
      console.log(err)
    }
  }

  handleUserSelect = selected => {
    const selectedTrips = selected ? selected.map(trip => trip.name) : []
    const pin = { ...this.state.pin, trips: selectedTrips }
    this.setState({ pin })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      await createPin({ ...this.state.pin })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    if (!this.state.pin.owner) return null
    const { pin } = this.state
    const options = this.state.myTrips.data.map(trips => {
      return {
        value: trips.name,
        label: trips.name,
        name: trips.id
      }
    }
    )

    return (
      <div className="create-a-pin">
        <h3>create a pin</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="name of the pin *"
            name="title"
            onChange={this.handleChange}
            value={pin.title}
          />
          <input
            placeholder="add an image link"
            name="image"
            onChange={this.handleChange}
            value={pin.image}
          />
          <input
            placeholder="add a link"
            name="link"
            onChange={this.handleChange}
            value={pin.link}
          />
          <Select
            options={options}
            isMulti
            placeholder='add it to a trip?'
            onChange={this.handleUserSelect}
            name="trips"
          />
          <textarea
            placeholder="add details"
            rows="4"
            maxLength="1000"
            name="details"
            onChange={this.handleChange}
            value={pin.details}
          />
          <button>submit</button>
        </form>
      </div>
    )
  }
}

export default CreatePin