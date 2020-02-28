import React from 'react';

import PageLayout from "./elements/PageLayout";
import './App.css';
import 'antd/dist/antd.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Login from "./screens/Login/Login";
import PrivateRoute from "./utils/components/PrivateRoute";
import Loading from "./elements/Loading";


class App extends React.Component {
  render() {
    return (
        <>
            <Loading/>
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
        </>
    );
  }
}

export default App;
