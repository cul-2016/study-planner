import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Details extends Component {
  render() {
    const assessment = this.props.location.state;
    return (
      <Fragment>
        <div>{assessment.name} {assessment.type}</div>
        <div>6 hours 0% Complete</div>
        <Link to={{pathname: `/timer/${assessment.name}`, state: assessment}}>
          <button>Work on this Assessment</button>
        </Link>
      </Fragment>
    )
  }
}


export default Details;
