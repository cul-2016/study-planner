import React, { Component, Fragment } from 'react';

import AssessmentCompletion from './AssessmentCompletion';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessments: []
    }
  }

  componentDidMount() {
    fetch(`/assessment`)
    .then(res => res.json())
    .then(result => {
      if (!result.ok) {
        throw Error(result.message);
      }
      this.setState({assessments: result.assessments});
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <Fragment>
        <h2>Assessment Targets</h2>
        {
          this.state.assessments.map((v,i) => {
            return <AssessmentCompletion key={i} assessment={v} />
          })
        }
      </Fragment>
    )
  }
}

export default List;
