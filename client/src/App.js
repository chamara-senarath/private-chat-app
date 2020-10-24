import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import ChatScreen from "./pages/ChatScreen";
import Authentication from "./pages/Authentication.js";

function App(){
    return(
        <Router>
            <Switch>
                <Route
                    path="/"
                    exact
                    render={() =>
                        localStorage.getItem('token')==null && localStorage.getItem('userID')==null
                            ? <Authentication />
                            : <Redirect to="/home" />}
                />
                <Route
                    path="/home/"
                    render={() =>
                        localStorage.getItem('token')!=null && localStorage.getItem('userID')!=null
                            ? <ChatScreen />
                            : <Redirect to="/" />}
                />
                {/*<Route component={NotFound} />*/}
            </Switch>
        </Router>
    )
}

export default App