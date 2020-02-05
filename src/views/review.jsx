import React, { Component } from "react";
import "./review.scss";
import NavBar from "../components/navbar";

class Review extends Component {
  state = {
    group: JSON.parse(localStorage.getItem("calendar.groups"))[0] || []
  };

  onChange = e => {
    this.setState({
      group: e.target.value
    });
  };

  getOptions = () => {
    return JSON.parse(localStorage.getItem("calendar.groups")).map(group => {
      return (
        <option key={group.name} value={group.name}>
          {group.name}
        </option>
      );
    });
  };

  getRows = () => {
    let events = JSON.parse(localStorage.getItem("calendar.events"));
    events = events.filter(event => event.group === this.state.group);
    let count = 1;
    return events.map(event => {
      return (
        <tr key={event.title}>
          <td>{count++}</td>
          <td>{event.title}</td>
          <td>
            {event.start.toLocaleString()} to {event.end.toLocaleString()}
          </td>
          <td>{event.group}</td>
          <td>
            <button className="btn btn--review-page btn--done">Done</button>
            <button
              className="btn btn--review-page btn--edit"
              onClick={() => {
                this.props.history.push("/calendar");
              }}
            >
              Reschedule
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="review">
          <select className="select-group" onChange={this.onChange}>
            {this.getOptions()}
          </select>
          <table className="events__table">
            <thead>
              <tr className="table__header">
                <th>Sl. No.</th>
                <th>Task</th>
                <th>Time and Date</th>
                <th>Group</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{this.getRows()}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default Review;
