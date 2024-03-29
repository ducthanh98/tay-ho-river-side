import React, { Component } from "react";
import { Switch, Route,Redirect } from "react-router-dom";
import CustomerManagement from "../screens/CustomerManagement/CustomerManagement";
import Notification from "../screens/Notification/Notification";
import Infor from "../screens/InforManagement/InforManagement";
import Navbar from "./Navbar";
import { Layout } from "antd";
import Header from "./Header";

import NotificationDetail from "../screens/NotificationDetail/NotificationDetail";

class PageLayout extends Component {
  render() {
    return (
      <Layout style={{ height: "100%" }}>
        <Navbar />
        <Layout>
          <Header />
          <Layout.Content style={{ margin: "20px" }}>
            <Switch>
              <Route path="/" exact redirect='infor-management'>
                <Redirect to='infor-management'/>
              </Route>
              <Route path="/customer-management">
                <CustomerManagement />
              </Route>
              <Route path="/notifications">
                <Notification />
              </Route>
              <Route path="/notification-detail">
                <NotificationDetail />
              </Route>
              <Route path='/infor-management'>
                  <Infor/>
              </Route>
            </Switch>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

export default PageLayout;
