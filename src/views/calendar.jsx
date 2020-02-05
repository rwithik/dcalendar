import React, { Component } from "react";
import NavBar from "../components/navbar";
import EventPopup from "../components/eventPopup";
import EditPopup from "../components/editPopup";
import AddTask from "../components/addTaskPopup";
import GroupPopup from "../components/groupPopup";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { UserSession, AppConfig } from "blockstack";

import "./calendar.scss";

const appConfig = new AppConfig();
const options = { decrypt: false };
const userSession = new UserSession({ appConfig: appConfig });

class Calendar extends Component {
  state = {
    showPopup: false,
    showEditPopup: false,
    showAddPopup: false,
    showGroupPopup: false,
    groups: [],
    events: [],
    activeEvent: {}
  };

  async componentDidMount() {
    let events;
    let groups;

    try {
      groups = JSON.parse(await userSession.getFile("groups.json", options));
      events = JSON.parse(await userSession.getFile("events.json", options));
      console.log(events);

      if (groups === null || groups.length === 0) {
        groups = [{ name: "default", color: "#607d8b" }];
        userSession.putFile("groups.json", JSON.stringify(groups), {
          encrypt: false
        });
      }
      if (events === null || events.length === 0) {
        events = [];
        userSession.putFile("events.json", JSON.stringify(events), {
          encrypt: false
        });
      }
      console.log(events);

      localStorage.setItem("calendar.groups", JSON.stringify(groups));
      localStorage.setItem("calendar.events", JSON.stringify(events));
    } catch (err) {
      console.error(err);
    }

    
  }

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
    userSession
      .putFile("events.json", JSON.stringify(events), { encrypt: false })
      .then(() => {
        this.setState({
          events,
          showEditPopup: false,
          showPopup: false
        });
        localStorage.setItem("calendar.events", JSON.stringify(events));
      });
  };

  handleAddTask = () => {
    this.setState({ showAddPopup: true });
  };

  handleSave = event => {
    const events = [...this.state.events, event];
    console.log(events);

    userSession
      .putFile("events.json", JSON.stringify(events), { encrypt: false })
      .then(() => {
        this.setState({ events });
        localStorage.setItem("calendar.events", JSON.stringify(events));
        this.handleClosePopup();
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleUpdate = event => {
    let events = [...this.state.events];
    events = events.filter(
      event => event.title !== this.state.activeEvent.title
    );
    events.push(event);
    userSession
      .putFile("events.json", JSON.stringify(events), { encrypt: false })
      .then(() => {
        this.setState({ events });
        localStorage.setItem("calendar.events", JSON.stringify(events));
        this.handleClosePopup();
      });
  };

  handleAddGroup = () => {
    this.setState({ showGroupPopup: true });
  };

  handleSaveGroup = group => {
    if (group.length === 0) return;
    const groups = [...this.state.groups, group];
    userSession
      .putFile("groups.json", JSON.stringify(groups), { encrypt: false })
      .then(() => {
        this.setState({ groups });
        localStorage.setItem("calendar.groups", JSON.stringify(groups));
        this.handleClosePopup();
      });
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
