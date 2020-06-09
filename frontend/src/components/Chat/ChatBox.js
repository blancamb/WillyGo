import React from 'react'

import { getAllMessages, sendMessage } from '../lib/api'
import { getUser } from '../lib/auth'

class ChatBox extends React.Component {

  state = {
    message: {
      content: '',
      chat: '',
      user: ''
    },
    allMessages: []
  }

  async componentDidMount() {
    try {
      this.pageSetup()
    } catch (err) {
      console.log(err)
    }
  }

  pageSetup = async () => {
    try {
      const clubID = this.props.props.match.params.clubID
      const res = await getAllMessages(clubID).reverse()
      this.setState({ allMessages: res.data.messages })
    } catch (err) {
      console.log(err)
    }
  }

  handleMessageChange = event => {
    try {
      const message = { ...this.state.message, [event.target.name]: event.target.value }
      this.setState({ message })
    } catch (err) {
      console.log(err)
    }
  }

  handleMessageSubmit = async event => {
    event.preventDefault()
    try {
      const clubID = this.props.props.match.params.clubID
      const user = getUser()
      const res = await sendMessage({ ...this.state.message, chat: clubID, user: user })
      this.setState({ allMessages: res.data.messages, message: { ...this.state.message, content: '', chat: clubID, user: user } })
      await this.pageSetup()
      console.log(res)


    } catch (err) {
      console.log(err)
    }
  }


  render() {
    if (!this.state.allMessages) return null

    return (
      <>
        <h1>CHAT</h1>        
        <div className="chatbox-frame">
          {this.state.allMessages.map(message => (
            <div key={message.id}>
              <h4>{message.content}</h4>
              <h5>{message.user.username} - on {message.created_at}</h5>
            </div>
          ))}
        </div>

        <form onSubmit={this.handleMessageSubmit}>
          <label>Write a message:</label>
          <textarea
            type="textarea"
            rows="2"
            maxLength="300"
            name="content"
            onChange={this.handleMessageChange}
            value={this.state.message.content}
          />
          <button>send a message</button>
        </form>

      </>
    )
  }
}

export default ChatBox