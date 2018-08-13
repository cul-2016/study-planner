import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import AssessmentCompletion from './AssessmentCompletion';

class List extends Component {
  render() {
    return (
      <Fragment>
        <Link to="/">
          <button>{"<- Back"}</button>
        </Link>
        <h1>Assessments</h1>
        {
          this.props.assessments.map((v,i) => {
            return <AssessmentCompletion key={i} assessmentName={v.name} type={v.type} />
          })
        }
      </Fragment>
    )
  }
}

export default List;
