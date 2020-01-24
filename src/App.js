import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Home from "./views/home";
import Calendar from "./views/calendar";
import Review from "./views/review";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/review" component={Review} />
      </Router>
    </div>
  );
}

export default App;
