import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import calculateCompletion from '../helpers/calculateCompletion.js';

class AssessmentCompletion extends Component {
  render() {
    const { assessment } = this.props;
    return (
      <Link to={{pathname: `/details/${assessment.name}`, state: assessment}}>
        <div className={`completion ${this.getRandomColour()}-target`}>
          <div>{assessment.name} {assessment.type}</div>
          <div>{assessment.target / 60} hours {calculateCompletion(assessment.target, assessment.complete)}% Complete</div>
        </div>
      </Link>
    )
  }

  getRandomColour() {
    const colourClasses = ["red", "yellow", "blue", "green", "purple", "orange"];
    return colourClasses[Math.floor(Math.random() * colourClasses.length)];
  }
}


export default AssessmentCompletion;
