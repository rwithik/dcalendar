import React, { Component } from "react";
import "./popup.scss";

class EventPopup extends Component {
  render() {
    const event = this.props.event;

    if (!this.props.show) return null;
    return (
      <div className="popup">
        <span className="popup__close" onClick={this.props.close}>
          [X]
        </span>
        <h2 className="event__title">{event.title}</h2>
        <div className="event__datetime">
          {event._instance.range.start.toLocaleString()} to{" "}
          {event._instance.range.end.toLocaleString()}
        </div>
        <div className="line"></div>
        <div className="btn-grp">
          <button className="btn btn--edit" onClick={this.props.editHandler}>
            Edit
          </button>
          <button
            className="btn btn--delete"
            onClick={this.props.deleteHandler}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default EventPopup;
