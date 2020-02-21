import React from 'react';
import {Switch, Route, BrowserRouter as Router, Redirect} from "react-router-dom";

import PageLayout from "./elements/PageLayout";
import Login from "./screens/Login/Login";
import PrivateRoute from "./utils/components/PrivateRoute";

import './App.css';
import 'antd/dist/antd.css';



class App extends React.Component {
  render() {
    return (
        <Router>
            <Switch>
                <Route path='/login' >
                    <Login />
                </Route>
                <PrivateRoute path='/'>
                    <PageLayout/>
                </PrivateRoute>
            </Switch>
        </Router>

    );
  }
}

export default App;
