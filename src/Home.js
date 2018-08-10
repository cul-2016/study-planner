import React, { Component } from 'react';
import  { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Study Planner</h1>
        </header>
        <div>
          <Link to="/add-assessment">Add assessment</Link>
          <Link to="/list-assessments">View assessment targets</Link>
        </div>
      </div>
    );
  }
}

export default Home;
