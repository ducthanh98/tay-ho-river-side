import React from 'react';
import {Route, Switch} from "react-router-dom";
import CustomerManagement from "../screens/CustomerManagement/CustomerManagement";
import {Layout} from "antd";
import Navbar from "./Navbar";
import Header from "./Header";

const PageLayout =()=>{
        return (
            <Layout style={{ height:'100%' }}>
                <Navbar />
                <Layout>
                    <Header />
                    <Layout.Content style={{ margin: '16px 16px' }}>
                            <Switch>
                                <Route path={`/customer-management`} >
                                    <CustomerManagement />
                                </Route>
                                <Route path={`/`}>
                                    <h3>Not Match.</h3>
                                </Route>
                            </Switch>
                    </Layout.Content>

                </Layout>
            </Layout>
        );
}


export default PageLayout;
