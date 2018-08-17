import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Home.js';
import AddAssessment from './Components/AddAssessment.js';
import List from './Components/List.js';
import Details from './Components/Details.js';
import Timer from './Components/Timer.js';
import Login from './Components/Login.js';

class App extends Component {
  state = {
    loggedIn: false
  }

  componentDidMount = () => {
    this.onLogin();
  }

  onLogin = () => {
    this.setState({loggedIn: this.isLoggedIn()});
  }

  isLoggedIn = () => {
    return document.cookie.indexOf("token") !== -1;
  }

  render () {
    return (
      <div className="container">
        <Switch>
          {!this.state.loggedIn &&
            <Fragment>
              <Route path="/" render={() => <Login onLogin={this.onLogin} />} />
            </Fragment>
          }
          <Fragment>
            <Route exact path="/" component={Home} />
            <Route path="/add-assessment" component={AddAssessment} />
            <Route path="/details/:assessment" component={Details} />
            <Route path="/timer/:assessment" component={Timer} />
          </Fragment>
        </Switch>
      </div>
    )
  }
}

export default App;
