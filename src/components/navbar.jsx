import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../public/images/200.jpg";
import "./navbar.scss";

class NavBar extends Component {
  state = {
    username: "davidbeckham.id",
    notLoggedIn: this.props.notLoggedIn
  };

  defaultNav = () => {
    return (
      <nav className="nav">
        <img src={logo} alt="" className="nav__logo" />
        <Link to="/calendar" className="nav__login">
          Login
        </Link>
      </nav>
    );
  };

  userNav = () => {
    return (
      <nav className="nav">
        <div className="logo">My Calendar</div>
        <div className="username">{this.state.username}</div>
        <div className="signout">
          <Link to="/">Signout</Link>
        </div>
      </nav>
    );
  };

  render() {
    if (this.state.notLoggedIn) return this.defaultNav();
    else return this.userNav();
  }
}

export default NavBar;
