import React, { Component } from "react";
import "../index.css";

function pad(n) {
  return n > 9 ? "" + n : "0" + n;
}

class Countdown extends Component {
  constructor() {
    super();
    var t = new Date();
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    var init_month = months[t.getMonth()];
    var init_day = t.getHours() > 18 ? t.getDate() + 1 : t.getDate();
    var init_year = t.getFullYear();
    var init_time = "15:14:40";

    this.state = {
      time: {},
      seconds:
        Math.ceil(
          new Date(init_month + " " + init_day + ", " + init_year + " " + init_time) - new Date()) / 1000
    };

    this.timer = 0;
    this.countDown = this.countDown.bind(this);
  }

  componentWillMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.timer = setInterval(this.countDown, 1000);
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    if (seconds <= 0) {
      seconds += 86400;
    }
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    if (seconds == 60) {
      seconds = 0;
      minutes += 1;
    }
    if (minutes == 60) {
      minutes = 0;
      hours += 1;
    }
    if (hours == 24) {
      minutes = 0;
      hours = 0;
      seconds = 0;
    }

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }

  render() {
    return (
      <div>
        <span className = "countdown-text">Time until next match</span>
        <span className="countdown">{pad(this.state.time.h)}<span className="blinker">:</span>{pad(this.state.time.m)}<span className="blinker">:</span>{pad(
          this.state.time.s
        )}</span>
      </div>
    );
  }
}

export default Countdown;
