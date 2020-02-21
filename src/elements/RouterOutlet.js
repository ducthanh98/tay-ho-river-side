import React, {Component} from 'react';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import Login from "../screens/Login/Login";
import PrivateRoute from "../utils/components/PrivateRoute";

class RouterOutlet extends Component {

    render() {
        return (
            <Router>
                <Switch>
                       <Route path='/login' >
                           <Login />
                       </Route>
                       <PrivateRoute path='/'></PrivateRoute>
               </Switch>
            </Router>

        );
    }
}


export default RouterOutlet;
