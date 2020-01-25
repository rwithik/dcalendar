import React, { Component } from "react";
import { CirclePicker } from "react-color";

import "./popup.scss";

class GroupPopup extends Component {
  state = {
    group: "",
    color: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  addGroup = () => {
    const group = {
      name: this.state.group,
      color: this.state.color
    };
    this.props.addHandler(group);
  };

  handleColorChange = e => {
    console.log(e);
    this.setState({
      color: e.hex
    });
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
        <CirclePicker onChangeComplete={this.handleColorChange} />

        <button className="btn btn--add" onClick={this.addGroup}>
          Add Group
        </button>
      </div>
    );
  }
}

export default GroupPopup;
