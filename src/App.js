import React from 'react';
import { Layout } from 'antd';


import Header from "./elements/Header";
import Navbar from "./elements/Navbar";
import RouterOutlet from "./elements/RouterOutlet";

import './App.css';
import 'antd/dist/antd.css';
import {BrowserRouter as Router} from "react-router-dom";


class App extends React.Component {
  render() {
    return (
            <Layout style={{ height:'100%' }}>
                <Navbar/>
                <Layout>
                    <Header />
                    <RouterOutlet></RouterOutlet>
                </Layout>
            </Layout>

    );
  }
}

export default App;
