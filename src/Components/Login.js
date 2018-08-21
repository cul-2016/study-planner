import React, { Component } from 'react';
import handleFetch from '../helpers/handleFetch.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }

  onChange = (e) => {
    e.preventDefault();
    let newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  login = (e) => {
    e.preventDefault();
    let init = {
      method: 'POST',
      body: JSON.stringify(this.state)
    };
    handleFetch('/login', init)
    .then(() => this.props.onLogin())
  }

  render() {
    return (
      <form>
        <div>
          <label htmlFor="login-email">Email</label>
          <input type="email" id="login-email" name="email" onChange={this.onChange} />
        </div>
        <div>
          <label htmlFor="login-password">Password</label>
          <input type="password" id="login-password" name="password" onChange={this.onChange} />
        </div>
        <button className="button" onClick={this.login}>Log in</button>
      </form>
    )
  }
}

export default Login;
