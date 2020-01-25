import React, { Component } from "react";
import logo from "../public/images/200.jpg";
import { UserSession, AppConfig } from "blockstack";
import "./navbar.scss";

const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig: appConfig });

class NavBar extends Component {
  state = {
    username: !this.props.notLoggedIn
      ? userSession.loadUserData().username
      : "",
    notLoggedIn: this.props.notLoggedIn
  };

  handleSignin = e => {
    e.preventDefault();
    userSession.redirectToSignIn();
  };

  handleSignOut(e) {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  defaultNav = () => {
    return (
      <nav className="nav">
        <img src={logo} alt="" className="nav__logo" />
        {userSession.isUserSignedIn() ? (
          <button className="nav__login" onClick={this.handleSignOut}>
            Logout
          </button>
        ) : (
          <button className="nav__login" onClick={this.handleSignin}>
            Login
          </button>
        )}
      </nav>
    );
  };

  userNav = () => {
    return (
      <nav className="nav">
        <div className="logo">My Calendar</div>
        <div className="username">{this.state.username}</div>
        <div className="signout">
          <button onClick={this.handleSignOut} className="nav__logout">
            Signout
          </button>
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
