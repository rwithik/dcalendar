import React, { Component } from "react";
import NavBar from "../components/navbar";
import landingImg from "../public/images/600.jpg";
import "./home.scss";

class Home extends Component {
  render() {
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
            <img src={landingImg} alt="" className="landing__img" />
          </div>
          <div className="copyright">Copyright @DCalendar2019</div>
        </section>
      </React.Fragment>
    );
  }
}

export default Home;
