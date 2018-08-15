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
    handleFetch(`${process.env.REACT_APP_API_URL}/assessment`)
    .then(result => {
      this.setState({assessments: result.assessments});
    })
  }

  render() {
    return (
      <Fragment>
        <Link to="/">
          <button>{"<- Back"}</button>
        </Link>
        <h1>Assessments</h1>
        {
          this.state.assessments.map((v,i) => {
            return <AssessmentCompletion key={i} assessmentName={v.name} type={v.type} />
          })
        }
      </Fragment>
    )
  }
}

export default List;
