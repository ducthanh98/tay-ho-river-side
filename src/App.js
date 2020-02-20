import React from 'react';
import { Layout } from 'antd';
import {Provider} from 'react-redux'


import Header from "./layout/Header";
import Navbar from "./layout/Navbar";
import RouterOutlet from "./layout/RouterOutlet";
import store from "./redux/store";

import './App.css';
import 'antd/dist/antd.css';


class App extends React.Component {
    state = {
        showLayout: true,
    };

  render() {
    return (
        <Provider store={store}>
            <Layout style={{ height:'100%' }}>
                <Navbar/>
                <Layout>
                    <Header />
                    <RouterOutlet></RouterOutlet>
                </Layout>
            </Layout>
        </Provider>
    );
  }
}

export default App;
