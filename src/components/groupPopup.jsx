import React, { Component } from "react";

import "./popup.scss";

class GroupPopup extends Component {
  state = {
    group: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  addGroup = () => {
    const { group } = this.state;
    this.props.addHandler(group);
  };

  render() {
    if (!this.props.show) return null;
    return (
      <div className="popup">
        <span className="popup__close" onClick={this.props.close}>
          [X]
        </span>
        <input
          type="text"
          className="input--group"
          placeholder="Group Name"
          name="group"
          value={this.state.group}
          onChange={this.handleChange}
        />

        <button className="btn btn--add" onClick={this.addGroup}>
          Add Group
        </button>
      </div>
    );
  }
}

export default GroupPopup;
