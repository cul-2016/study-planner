import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home.js';
import AddAssessment from './AddAssessment.js';
import List from './List.js';
import Details from './Details.js';

class App extends Component {
  render () {
    return (
      <Switch>
        <div className="container">
          <Route exact path="/" component={Home}/>
          <Route path="/add-assessment" component={AddAssessment}/>
          <Route path="/list-assessments" component={List}/>
          <Route path="/details/:assessment" component={Details} />
        </div>
      </Switch>
    )
  }
}

export default App;
