import React, { Component } from "react";
import NavBar from "../components/navbar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import EventPopup from "../components/eventPopup";
import EditPopup from "../components/editPopup";
import AddTask from "../components/addTaskPopup";
import GroupPopup from "../components/groupPopup";

import "./calendar.scss";

class Calendar extends Component {
  state = {
    showPopup: false,
    showEditPopup: false,
    showAddPopup: false,
    showGroupPopup: false,
    groups: JSON.parse(localStorage.getItem("calendar.groups")) || [],
    events: JSON.parse(localStorage.getItem("calendar.events")) || [],
    activeEvent: {}
  };

  handleClosePopup = () => {
    this.setState({
      showPopup: false,
      showEditPopup: false,
      showAddPopup: false,
      showGroupPopup: false
    });
  };

  handleEventClick = ({ event }) => {
    this.setState({
      activeEvent: event,
      showPopup: true,
      showEditPopup: false
    });
  };

  handleEdit = () => {
    this.setState({
      showPopup: false,
      showEditPopup: true
    });
  };

  handleReview = () => {
    this.props.history.push("/review");
  };

  handleDelete = () => {
    let events = [...this.state.events];
    events = events.filter(
      event => event.title !== this.state.activeEvent.title
    );
    this.setState({
      events,
      showEditPopup: false,
      showPopup: false
    });
    localStorage.setItem("calendar.events", JSON.stringify(events));
  };

  handleAddTask = () => {
    this.setState({ showAddPopup: true });
  };

  handleSave = event => {
    const events = [...this.state.events, event];
    this.setState({
      events
    });
    localStorage.setItem("calendar.events", JSON.stringify(events));
    this.handleClosePopup();
  };

  handleUpdate = event => {
    let events = [...this.state.events];
    events = events.filter(
      event => event.title !== this.state.activeEvent.title
    );
    events.push(event);
    this.setState({
      events
    });
    localStorage.setItem("calendar.events", JSON.stringify(events));
    this.handleClosePopup();
  };

  handleAddGroup = () => {
    this.setState({ showGroupPopup: true });
  };

  handleSaveGroup = group => {
    if (group.length === 0) return;
    const groups = [...this.state.groups, group];
    this.setState({ groups });
    localStorage.setItem("calendar.groups", JSON.stringify(groups));
    this.handleClosePopup();
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container">
          <div className="calendar-container">
            <FullCalendar
              defaultView="dayGridMonth"
              plugins={[dayGridPlugin]}
              events={this.state.events}
              height={600}
              eventClick={this.handleEventClick}
            />
          </div>
          <div className="calendar__buttons">
            <button className="btn btn--add-task" onClick={this.handleAddTask}>
              Add Task
            </button>
            <button className="btn btn--add-grp" onClick={this.handleAddGroup}>
              Add Group
            </button>
            <button className="btn btn--review" onClick={this.handleReview}>
              Review
            </button>
          </div>
        </div>
        <EventPopup
          show={this.state.showPopup}
          close={this.handleClosePopup}
          event={this.state.activeEvent}
          editHandler={this.handleEdit}
          deleteHandler={this.handleDelete}
        />
        <EditPopup
          show={this.state.showEditPopup}
          close={this.handleClosePopup}
          title={this.state.activeEvent.title}
          start={this.state.activeEvent.start}
          end={this.state.activeEvent.end}
          group={this.state.activeEvent.group}
          updateHandler={this.handleUpdate}
        />
        <AddTask
          show={this.state.showAddPopup}
          close={this.handleClosePopup}
          saveHandler={this.handleSave}
        />
        <GroupPopup
          show={this.state.showGroupPopup}
          close={this.handleClosePopup}
          addHandler={this.handleSaveGroup}
        />
      </React.Fragment>
    );
  }
}

export default Calendar;
