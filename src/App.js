import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Home.js';
import AddAssessment from './Components/AddAssessment.js';
import List from './Components/List.js';
import Details from './Components/Details.js';
import Timer from './Components/Timer.js';

class App extends Component {
  render () {
    return (
      <Switch>
        <div className="container">
          <Route exact path="/" component={Home}/>
          <Route path="/add-assessment" component={AddAssessment}/>
          <Route path="/list-assessments" component={List}/>
          <Route path="/details/:assessment" component={Details} />
          <Route path="/timer/:assessment" component={Timer} />
        </div>
      </Switch>
    )
  }
}

export default App;
