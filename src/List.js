import React, { Component, Fragment } from 'react';

import AssessmentCompletion from './AssessmentCompletion';

class List extends Component {
  render() {
    return (
      <Fragment>
        <button onClick={this.props.history.goBack}>{"<- Back"}</button>
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
