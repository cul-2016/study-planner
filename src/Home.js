import React, { Component, Fragment } from 'react';
import  { Link } from 'react-router-dom';

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
        <div>
          <Link to="/add-assessment">Add assessment</Link>
        </div>
        <div>
          <Link to="/list-assessments">View assessment targets</Link>
        </div>
      </Fragment>
    );
  }
}

export default Home;
