import React, { Component } from 'react';
import { SingleDatePicker } from 'react-dates';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import { Link } from 'react-router-dom';
import handleFetch from '../helpers/handleFetch.js';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const priorities = ["Very Low", "Low", "Medium", "High", "Very High"];
const assessmentTypes = ["Exam", "Coursework"];

class AddAssessment extends Component {
    state = {
      date: null,
      name: "",
      priority: 0,
      type: ""
    }

  onChange = e => {
    e.preventDefault();
    let newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  addAssessment = () => {
    let init = {
      method: 'POST',
      body: JSON.stringify(Object.assign({}, this.state, {
        schedule: this.props.location.state.scheduledTime
      }))
    };

    handleFetch(`/assessment`, init)
    .then(() => this.props.history.replace("/"))
  }

  render() {
    return (
      <div>
        <button className="button back-button" onClick={this.props.history.goBack}>{"<- Back"}</button>
        <h1>Add Assessment</h1>
        <h2>Name</h2>
        <input
          type="text"
          name="name"
          className="assessment-name-input"
          placeholder="Assessment Name"
          onChange={this.onChange}
        />
        <h2>Date</h2>
        <SingleDatePicker
          date={this.state.date}
          onDateChange={date => this.setState({ date })}
          focused={this.state.focused}
          onFocusChange={({ focused }) => this.setState({ focused })}
          id="datepicker"
          numberOfMonths={1}
          displayFormat="DD/MM/YYYY"
        />
        <h2>Type of Assessment</h2>
        <RadioGroup onChange={ selected => this.setState({type: selected}) } horizontal>
          {assessmentTypes.map((v, i) => {
            return <RadioButton pointColor="#2574A9" value={v.toLowerCase()} key={i}>{v}</RadioButton>
          })}
        </RadioGroup>
        <h2>Priority</h2>
        <RadioGroup onChange={ selected => this.setState({priority: selected}) } horizontal={false}>
          {priorities.map((v, i) => {
            return <RadioButton pointColor="#2574A9" value={`${i+1}`} key={i}>{v}</RadioButton>
          })}
        </RadioGroup>
        <div className="tc">
          <button className="button" onClick={this.addAssessment}>Add Assessment</button>
        </div>
      </div>
    )
  }
}

export default AddAssessment;
