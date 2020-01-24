import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";

import "./popup.scss";
import "./addpopup.scss";

class EditPopup extends Component {
  state = {
    title: this.props.title,
    start: this.props.start,
    end: this.props.end,
    group: this.props.group
  };

  // static getDerivedStateFromProps(props, state) {
  //   return {
  //     title: props.title,
  //     start: props.start,
  //     end: props.end,
  //     group: props.group
  //   };
  // }

  handleChangeStartDate = d => {
    this.setState({
      start: d
    });
  };

  handleChangeEndDate = d => {
    this.setState({
      end: d
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSave = () => {
    const { title, start, end, group } = this.state;
    if (title.length === 0) return null;
    this.setState({
      start: null,
      end: null,
      title: "",
      group: ""
    });
    this.props.updateHandler({
      title,
      start,
      end,
      group
    });
  };

  getGroups = () => {
    const groups = JSON.parse(localStorage.getItem("calendar.groups"));
    return groups.map(item => {
      return (
        <option key={item} value={item}>
          {item}
        </option>
      );
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
          className="input--title"
          placeholder="Task Title"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <DateTimePicker
          onChange={this.handleChangeStartDate}
          value={this.state.start}
          className="input__time"
          name="start"
        />
        <DateTimePicker
          onChange={this.handleChangeEndDate}
          value={this.state.end}
          className="input__time"
          name="end"
        />
        <select
          type="input"
          className="select"
          placeholder="Group"
          value={this.state.group}
          onChange={this.handleChange}
          name="group"
        >
          {this.getGroups()}
        </select>
        <div className="line"></div>
        <div className="btn-grp">
          <button className="btn btn--save" onClick={this.handleSave}>
            Update
          </button>
        </div>
      </div>
    );
  }
}

export default EditPopup;
