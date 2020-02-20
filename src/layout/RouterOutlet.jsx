import React, {Component} from 'react';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import Login from "../pages/Login/Login";
import PrivateRoute from "../shared/components/PrivateRoute";

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
