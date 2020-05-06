import React from "react";
import "./Clock.js";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
      stopList: [],
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        time: new Date(),
      });
    }, 1);
  }

  formatSet(data) {
    return data < 10 ? "0" + data : data;
  }

  formatms(data) {
    return data < 100 ? (data < 10 ? "00" + data : "0" + data) : data;
  }

  stopEventListner() {
    this.setState({
      stopList: this.state.stopList.concat(this.state.time),
    });
  }

  deleteEventListner(idx) {
    const { stopList } = this.state;
    stopList.splice(idx, 1);
    this.setState({
      stopList,
    });
  }

  render() {
    const { time } = this.state;
    const { color } = this.props;
    const Y = this.formatSet(time.getFullYear());
    const M = this.formatSet(time.getMonth() + 1);
    const D = this.formatSet(time.getDate());
    const h = this.formatSet(time.getHours());
    const m = this.formatSet(time.getMinutes());
    const s = this.formatSet(time.getSeconds());
    const ms = this.formatms(time.getMilliseconds());

    return (
      <div className="clockBox" style={{ color }}>
        <div>
          <div className="date">
            {Y}.{M}.{D}
          </div>
          <span className="time">
            {h}:{m}:{s}.{ms}
          </span>
          <ul>
            {this.state.stopList.map((entry, idx) => {
              return (
                <li key={idx}>
                  {entry.getSeconds()}
                  <span className="ms">{entry.getMilliseconds()}</span>
                  <span
                    className="delete-btn"
                    onClick={this.deleteEventListner.bind(this, idx)}
                  >
                    X
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="button" onClick={this.stopEventListner.bind(this)}>
            Stop!
          </div>
        </div>
      </div>
    );
  }
}

export default Clock;
