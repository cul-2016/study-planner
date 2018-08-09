import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home.js';
import AddAssessment from './AddAssessment.js';
import List from './List.js';
import Details from './Details.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      assessments: [
        {name: "Psychology", type: "Exam"},
        {name: "Maths", type: "Exam"},
        {name: "English", type: "Coursework"}
      ]
    }
  }

  render () {
    return (
      <Switch>
        <div className="container">
          <Route exact path="/" component={Home}/>
          <Route path="/add-assessment" component={AddAssessment}/>
          <Route path="/list-assessments" render={(props) => <List {...props} assessments={this.state.assessments}/>}/>
          <Route path="/details/:assessment" component={Details} />
        </div>
      </Switch>
    )
  }
}

export default App;
