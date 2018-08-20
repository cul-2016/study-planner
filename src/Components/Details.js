import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import calculateCompletion from '../helpers/calculateCompletion.js';

class Details extends Component {
  render() {
    const assessment = this.props.location.state;
    return (
      <Fragment>
        <button className="button back-button" onClick={this.props.history.goBack}>{"<- Back"}</button>
        <h1>{assessment.name} {assessment.type}</h1>
        <div className="mb1">{assessment.target / 60} hours {calculateCompletion(assessment.target, assessment.complete)}% Complete</div>
        <Link to={{pathname: `/timer/${assessment.name}`, state: assessment}}>
          <button className="button">Work on this Assessment</button>
        </Link>
      </Fragment>
    )
  }
}


export default Details;
