import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import AssessmentCompletion from './AssessmentCompletion.js';
import handleFetch from '../helpers/handleFetch.js';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessments: []
    }
  }

  componentDidMount() {
    handleFetch(`/assessment`)
    .then(result => {
      this.setState({assessments: result.assessments || []});
    })
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
