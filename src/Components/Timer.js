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

  componentWillUnmount = () => {
    clearInterval(this.timer);
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
        <button className="button back-button" onClick={this.props.history.goBack}>{"<- Back"}</button>
        <h1>{this.assessment.name} {this.assessment.type}</h1>
        <div className="timer">{this.renderTime(this.state.timeRemaining)}</div>
        <div className="tc">
          {
            !this.state.started &&
            <button className="button" onClick={() => this.setState({started: true}, () => this.startTimer())}>
              Start Studying
            </button>
          }
          {
            this.state.started &&
            <button className="button" onClick={() => {
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
        </div>
      </Fragment>
    )
  }
}

export default Timer;