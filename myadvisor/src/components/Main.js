import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import StudentProfile from './StudentProfile';
import CourseList from './CourseList';
import CourseDetails from './CourseDetails';
import Career from './Career';
import TopBar from './TopBar';
import "../App.css"
import SignInSide from "./login";


class Main extends Component {
  render() {
    return (
      <div className="main-panel">
          <TopBar></TopBar>
          <div className="row">
              <div className="col-sm-1">
              </div>
              <div className="col-sm-10">
                <Router>
                  <Switch>
                    <Route path="/home" component={StudentProfile} />
                    <Route path="/courses" component={CourseList} />
                    <Route path="/coursedetails" component={CourseDetails} />
                    <Route path="/career" component={Career} />
                    <Route path="/login" component={SignInSide} />
                    <Redirect from="*" to="/home" />
                  </Switch>
                </Router>
              </div>
          </div>
      </div>
    );
  }
}

export default Main;