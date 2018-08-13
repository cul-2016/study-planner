import React, { Component, Fragment } from 'react';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import { Link } from 'react-router-dom';

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
    this.props.addAssessment(this.state);
    this.props.history.push("/list-assessments");
  }

  render() {
    return (
      <div>
        <Link to="/">
          <button>{"<- Back"}</button>
        </Link>
        <h1>Add Assessment</h1>
        <h2>Name</h2>
        <input
          type="text"
          name="name"
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
          numberOfMonths={3}
          displayFormat="DD/MM/YYYY"
        />
        <h2>Type of Assessment</h2>
        <RadioGroup onChange={ selected => this.setState({type: selected}) } horizontal>
          {assessmentTypes.map((v, i) => {
            return <RadioButton value={v.toLowerCase()} key={i}>{v}</RadioButton>
          })}
        </RadioGroup>
        <h2>Priority</h2>
        <RadioGroup onChange={ selected => this.setState({priority: selected}) } horizontal>
          {priorities.map((v, i) => {
            return <RadioButton value={`${i+1}`} key={i}>{v}</RadioButton>
          })}
        </RadioGroup>
        <button onClick={this.addAssessment}>Add Assessment</button>
      </div>
    )
  }
}

export default AddAssessment;
