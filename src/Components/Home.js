import React, { Component, Fragment } from 'react';
import  { Link } from 'react-router-dom';

import List from './List.js';
import handleFetch from '../helpers/handleFetch.js';

class Home extends Component {
  state = {
    scheduledTime: 6
  }

  componentDidMount = () => {
    handleFetch(`/schedule`)
    .then(result => {
      this.setState({scheduledTime: parseInt(result.schedule, 10) / 60});
    })
  }

  onChange = (e) => {
    e.preventDefault();

    let newState = {};
    newState[e.target.name] = e.target.value;

    clearInterval(this.schedule);

    this.setState(newState, () => {
      this.schedule = setTimeout(() => {
        this.updateSchedule();
      }, 1000); // Wait one second so we don't make lots of requests if input changes quickly
    });
  }

  updateSchedule = () => {
    let init = {
      method: 'POST',
      body: JSON.stringify({schedule: this.state.scheduledTime})
    }

    handleFetch('/schedule', init)
  }

  render() {
    return (
      <Fragment>
        <header>
          <h1>Study Planner</h1>
        </header>
        <p>I want to study for <input
          className="schedule-input"
          type="number"
          value={this.state.scheduledTime}
          name="scheduledTime"
          onChange={this.onChange}
        /> hours this week</p>
        <div className="tc">
          <Link to={{pathname: "/add-assessment", state: this.state}}>
            <button className="button">Add assessment</button>
          </Link>
        </div>
        <div>
          <List />
        </div>
      </Fragment>
    );
  }
}

export default Home;
