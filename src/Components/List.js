import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import AssessmentCompletion from './AssessmentCompletion';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessments: []
    }
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/assessment`)
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
