import React, { Component, Fragment } from 'react';
import  { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <Fragment>
        <header>
          <h1>Study Planner</h1>
        </header>
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
