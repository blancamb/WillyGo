import React from 'react'
import { registerUser } from '../lib/api'



class Register extends React.Component {

  state = {
    formData: {
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    errors: {}
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    const errors = { ...this.state.errors, [event.target.name]: '' }
    this.setState({ formData, errors })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      await registerUser(this.state.formData)
      this.props.history.push('/login')
    } catch (err) {
      // this.setState({ errors: err.response.data.errors })
      console.log('error!!!')
    }
  }

  render() {
    const { formData } = this.state

    return (
      <div className="main-page">
        <div className="page-title">
          <h1>register</h1>
        </div>        
        <form 
          className="auth"
          onSubmit={this.handleSubmit}>
          <div className="field">
            <label>username</label>
            <input
              placeholder="username"
              name="username"
              onChange={this.handleChange}
              value={formData.username}
            />
          </div>

          <div className="field">
            <label>email</label>
            <input
              placeholder="email"
              name="email"
              onChange={this.handleChange}
              value={formData.email}
            />
          </div>

          <div className="field">
            <label>password</label>
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={this.handleChange}
              value={formData.password}
            />
          </div>

          <div className="field">
            <label>confirm password</label>
            <input
              type="password"
              placeholder="confirm password"
              name="password_confirmation"
              onChange={this.handleChange}
              value={formData.password_confirmation}
            />
          </div>

          <button>submit</button>

        </form>
      </div>
    )
  }
}

export default Register