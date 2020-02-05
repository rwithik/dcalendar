import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";

import "./popup.scss";
import "./addpopup.scss";

class AddTask extends Component {
 
  let groupValue = "";
  if (localStorage.getItem("calendar.groups"))
  {
    groupValue = JSON.parse(localStorage.getItem("calendar.groups"))[0];
  }
  else{
    groupValue = "default";
  }
  
  state = {
    title: "",
    start: new Date(),
    end: new Date(),
    group: groupValue
  };

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
    const groups = JSON.parse(localStorage.getItem("calendar.groups"));
    const color = groups.filter(g => g.name === group.name)[0].color;
  

    if (title.length === 0) return null;
    this.props.saveHandler({
      title,
      start,
      end,
      group,
      backgroundColor: color
    });
    this.setState({
      start: null,
      end: null,
      title: "",
      group: ""
    });
  };

  getGroups = () => {
    const groups = JSON.parse(localStorage.getItem("calendar.groups"));
    if (groups.length === 0) return [];
    return groups.map(item => {
      return (
        <option key={item.name} value={item.name}>
          {item.name}
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
          placeholder="Enter Task Title"
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
          type="text"
          className="select"
          placeholder="Group"
          onChange={this.handleChange}
          name="group"
        >
          {this.getGroups()}
        </select>
        <div className="line"></div>
        <div className="btn-grp">
          <button className="btn btn--save" onClick={this.handleSave}>
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default AddTask;
