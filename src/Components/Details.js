import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Details extends Component {
  render() {
    const assessment = this.props.location.state;
    return (
      <Fragment>
        <button className="button back-button" onClick={this.props.history.goBack}>{"<- Back"}</button>
        <h1>{assessment.name} {assessment.type}</h1>
        <div className="mb1">6 hours 0% Complete</div>
        <Link to={{pathname: `/timer/${assessment.name}`, state: assessment}}>
          <button className="button">Work on this Assessment</button>
        </Link>
      </Fragment>
    )
  }
}


export default Details;
