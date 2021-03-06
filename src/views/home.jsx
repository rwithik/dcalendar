import React, { Component } from "react";
import NavBar from "../components/navbar";
import landingImg from "../public/images/thumb.jpg";
import { UserSession, AppConfig } from "blockstack";
import "./home.scss";
import Lottie from 'react-lottie';
import animationData from '../public/cal.json'
const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig: appConfig });

class Home extends Component {
  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(userData => {
       localStorage.setItem("calendar.events", []);
       localStorage.setItem("calendar.groups", []);
        this.props.history.push("/calendar");
      });
    }
  }

  render() {
  const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    }
    return (
      <React.Fragment>
        <NavBar notLoggedIn={true} />
        <section className="landing">
          <div className="landing__left bold">
            <ul className="landing__list">
              <li className="landing__item">Schedule your appointments</li>
              <li className="landing__item">
                Save your appointments on decentralized web
              </li>
              <li className="landing__item">Own your data</li>
              <li className="landing__item">Customise your routine</li>
              <li className="landing__item">Analyse your routine</li>
            </ul>
            <span className="landing__try">
              Try <span className="purple">DCalendar</span>
            </span>
          </div>
          <div className="landing__right">
           <Lottie options={defaultOptions}
              height={400} width={700}
            />
          </div>
          <div className="copyright">Copyright @DCalendar2019</div>
        </section>
      </React.Fragment>
    );
  }
}

export default Home;
