import React, { Component } from 'react';
import './AssessmentCompletion.css';

class AssessmentCompletion extends Component {
  render() {
    const { assessmentName, type } = this.props;
    return (
      <div className={`completion ${this.getRandomColour()}-target`}>
        <div>{assessmentName} {type}</div>
        <div>6 hours 0% Complete</div>
      </div>
    )
  }

  getRandomColour() {
    const colourClasses = ["red", "yellow", "blue", "green", "purple", "orange"];
    return colourClasses[Math.floor(Math.random() * colourClasses.length)];
  }
}


export default AssessmentCompletion;
