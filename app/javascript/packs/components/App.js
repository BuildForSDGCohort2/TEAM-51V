import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import LandingHome from './LandingHome'
import UserHome from './UserHome'
import LoginPage from './Auth/LoginPage'
import RegisterPage from './Auth/RegisterPage'
import Dashboard from './Dashboard/Dashboard'
import MentorsPage from './Mentors/MentorsPage';
import MenteesPage from './Mentees/MenteesPage';
import Explore from './Explore/Explore';
import Profile from './Profile/Profile';
import VideoCallComponent from './Dashboard/VideoCallPage';
import Meeting from './meeting';
import JoinMeeting from './JoinMeeting';


const App = ({ user }) => {

    return (<Switch>

                <Route exact path="/" component={LandingHome} />
                <Route exact path="/sign_in" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/mentors" component={MentorsPage} />
                <Route exact path="/mentees" component={MenteesPage} />
                <Route exact path="/profile/:username" component={Profile} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/call/banasco" component={VideoCallComponent} />
                <Route path="/start/meeting/:username" component={JoinMeeting} />
                <Route path="/explore" component={Explore} />
                <Route path="/meeting" component={Meeting} />
                {/* <Redirect from="/" to="/" /> */}
    </Switch>)
}

export default App;