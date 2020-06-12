import React from 'react'
import { loginUser } from '../lib/api'
import { setToken } from '../lib/auth'

class Login extends React.Component {

  state = {
    formData: {
      username: '',
      password: ''
    },
    error: ''
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData, error: '' })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await loginUser(this.state.formData)
      setToken(res.data.token)
      this.props.history.push('/dashboard')

    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { formData } = this.state
    return (
      <div className="main-page">
        <div className="page-title">
          <h1>login</h1>
        </div>   
        <form 
          className="auth login"
          onSubmit={this.handleSubmit}>
          <div className="field">
            <label>username:</label>
            <input 
              placeholder="username"
              name="username"
              onChange={this.handleChange}
              value={formData.username}
            />
          </div>

          <div className="field">
            <label>password:</label>
            <input 
              type="password"
              placeholder="password"
              name="password"
              onChange={this.handleChange}
              value={formData.password}
            />
          </div>

          <button>submit</button>
        </form>
      </div>
    )
  }
}

export default Login