import React, { Component, Fragment } from 'react';
import  { Link } from 'react-router-dom';

import List from './List.js';

class Home extends Component {
  state = {
    scheduledTime: 6
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
          onChange={(e) => this.setState({scheduledTime: e.target.value})}
        /> hours this week</p>
        <div className="tc">
          <Link to="/add-assessment">
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
