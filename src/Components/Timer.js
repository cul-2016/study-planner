import React, { Component, Fragment } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.assessment = this.props.location.state;
    this.state = {
      timeRemaining: 30 * 60 * 1000,
      started: false,
      paused: false
    }
  }

  renderTime = (ms) => {
    const minutes = this.padWithZero(Math.floor((ms / (1000*60)) % 60));
    const seconds = this.padWithZero(Math.floor((ms / 1000) % 60));

    return `${minutes}:${seconds}`;
  }

  padWithZero = (num) => num < 10 ? "0" + num : num;

  startTimer = () => {
    this.timer = setInterval(this.tick, 100)
  }

  pauseTimer = () => {
    if (this.state.paused) {
      clearInterval(this.timer);
    } else {
      this.startTimer();
    }
  }

  tick = () => {
    this.setState((prevState) => {
      return {timeRemaining: prevState.timeRemaining - 100};
    });
  }

  render() {
    return (
      <Fragment>
        <div>{this.assessment.name} {this.assessment.type}</div>
        <div>{this.renderTime(this.state.timeRemaining)}</div>
        {
          !this.state.started &&
          <button onClick={() => this.setState({started: true}, () => this.startTimer())}>
            Start Studying
          </button>
        }
        {
          this.state.started &&
          <button onClick={() => {
            this.setState(
              (prevState) => {
                return {paused: !prevState.paused}
              },
              () => this.pauseTimer()
            )
          }}>
            {this.state.paused ? "Resume" : "Pause"}
          </button>
        }
      </Fragment>
    )
  }
}

export default Timer;
