import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import StaffDashboard from './Staff/StaffDashboard';
import StaffNavbar from './Staff/StaffNavbar';

import Courses from './Staff/Courses';
import Students from './Staff/Students';

function StaffMain() {
    return (
        <Router>
            <StaffNavbar/>
            <Switch>
                <Route exact path="/staff" component={StaffDashboard} />
                <Route exact path="/staff/courses" component={Courses} />
                <Route exact path="/staff/students" component={Students} />
                <Redirect from="*" to="/staff" />
            </Switch>
        </Router>
    );
}

export default StaffMain;
