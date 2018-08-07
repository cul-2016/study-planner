import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home.js';
import AddAssessment from './AddAssessment.js';
import List from './List.js';

const App = () => {
  return (
    <Switch>
      <div className="container">
        <Route exact path="/" component={Home}/>
        <Route path="/add-assessment" component={AddAssessment}/>
        <Route path="/list-assessments" component={List}/>
      </div>
    </Switch>
  )
}

export default App;
