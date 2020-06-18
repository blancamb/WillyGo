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
      const clubID = this.props.clubID
      const res = await getAllMessages(clubID)
      const chatReverse = await res.data.messages.reverse()
      this.setState({ allMessages: chatReverse })
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
      const clubID = this.props.clubID
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
        <div className="chatbox-frame">
          <h1>chat</h1>
          <div className="chat-feed">
            {this.state.allMessages.map(message => (
              <div key={message.id}
                className="chat-message"
              >
                <h5><strong>{message.user.username}</strong> on {message.created_at}</h5>
                <h4>{message.content}</h4>
              </div>
            ))}
          </div>
          
      
          <div className="create-message">
            <form onSubmit={this.handleMessageSubmit}>
              <textarea
                type="textarea"
                rows="2"
                maxLength="300"
                name="content"
                onChange={this.handleMessageChange}
                value={this.state.message.content}
              />
              <button>reply</button>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default ChatBox