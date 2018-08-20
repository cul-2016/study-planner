import React, { Component, Fragment } from 'react';
import handleFetch from '../helpers/handleFetch.js';

const initialTime = 30 * 60 * 1000; // Set timer to 30 minutes
const browserVisibilityEvents = [
  "visibilitychange",
  "webkitvisibilitychange",
  "mozvisibilitychange",
  "msvisibilitychange"
];

class Timer extends Component {
  constructor(props) {
    super(props);
    this.assessment = this.props.location.state;
    this.state = {
      timeRemaining: initialTime,
      started: false,
      paused: false,
      hiddenTime: 0,
      finished: false
    }
  }

  componentDidMount = () => {
    browserVisibilityEvents.forEach(e => {
      document.addEventListener(e, this.onVisibilityChange);
    });
  }


  componentWillUnmount = () => {
    clearInterval(this.timer);
  }

  onVisibilityChange = (e) => {
    if (e.target.visibilityState === "hidden") {
      clearInterval(this.timer);
      this.setState({hiddenTime: Date.now()});
    } else if (e.target.visibilityState === "visible") {
      this.setState((oldState) => {
        const timeRemaining = oldState.timeRemaining - (Date.now() - oldState.hiddenTime);
        return {
          timeRemaining: timeRemaining > 0 ? timeRemaining : 0
        }
      }, () => this.startTimer());
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
      if (prevState.timeRemaining > 0) {
        return {timeRemaining: prevState.timeRemaining - 100};
      } else {
        return {timeRemaining: 0, finished: true};
      }
    });
  }

  elapsedTime = () => {
    return Math.floor((initialTime - this.state.timeRemaining) / (5 * 60 * 1000)) * 5; // Only take 5 minute intervals into account
  }

  logTime = () => {
    let init = {
      method: 'POST',
      body: JSON.stringify({name: this.assessment.name, user_id: 'TEST', elapsed_time: `${this.elapsedTime()}`})
    }

    handleFetch('/log-time', init)
    .then(() => clearInterval(this.timer))
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
          <button className="button" onClick={this.logTime}>
            Finish
          </button>
        </div>
      </Fragment>
    )
  }
}

export default Timer;
