import React, {Component, useState} from 'react';
import {Menu, Icon, Layout} from "antd";
import {BrowserRouter as Router, Link } from "react-router-dom";
import Rectangle from '../assets/images/Rectangle 813.png'
import {AuthService} from "../services/authService";
const { SubMenu } = Menu;
const {Sider} = Layout;

const styles = {
    logo:{
        fontFamily: 'Lobster, cursive',
        color: '#ffff',
        height:'44px',
        textAlign:'center',
        marginTop:'20px',
        fontSize:'20px',
        borderBottom:'1px solid #032A47'
    },
    rectangle:{
        position:'absolute',
        left:0,
        bottom:20,
        width:'200px',
        height:'80px',
        backgroundImage:`url(${Rectangle})!important`,
    }
}

class Navbar extends Component{
    state = {
        userInfo: AuthService.get().userInfo
    }

    componentDidMount(){
        AuthService.onChange('navbar',()=>{
            this.setState({userInfo:AuthService.get().userInfo})
        });
    }

    logout = async ()=>{
        localStorage.removeItem('userInfo');
        await AuthService.setAndBroadcast({...AuthService.get(),userInfo:null})
    }
    render() {
        return (
            <>
                {
                    this.state.userInfo &&
                    <Sider>
                        <div style={styles.logo}>
                            <Icon type="container" style={{paddingRight: '10px'}} />
                            TayHoRiverview
                        </div>
                        <Router>
                            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                                <Menu.Item key="1">
                                    <Link to={''}>
                                        <img src={require('../assets/images/business-24px.svg')} alt={'contact'}/> &nbsp;
                                        <span>Quản lý tòa nhà</span>
                                    </Link>
                                </Menu.Item>
                                <SubMenu
                                    key="2"
                                    title={
                                        <Link to={''}>
                                            <img src={require('../assets/images/format_indent_increase-24px.svg')} alt={'business'}/> &nbsp;
                                            <span>Quản lý căn hộ</span>
                                        </Link>
                                    }
                                >
                                    <Menu.Item key="3">Tom</Menu.Item>
                                    <Menu.Item key="4">Bill</Menu.Item>
                                    <Menu.Item key="5">Alex</Menu.Item>
                                </SubMenu>

                                <Menu.Item key="3">
                                    <Link to={''}>
                                        <img src={require('../assets/images/contacts-24px.svg')} alt={'contact'}/> &nbsp;
                                        <span>Quản lý người mua</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Link to={''}>
                                        <img src={require('../assets/images/post_add-24px.svg')} alt={'notification'}/> &nbsp;
                                        <span>Tạo thông báo</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="5">
                                    <Link to={'#'} onClick={this.logout}>
                                        <img src={require('../assets/images/power_settings_new-24px.svg')} alt={'logout'}/> &nbsp;
                                        <span>Đăng xuất</span>
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </Router>
                        <img style={styles.rectangle} src={require('../assets/images/Rectangle 813.png')} alt='rectangle'/>
                    </Sider>
                }
            </>
        );
    }

    componentWillUnmount() {
        AuthService.deleteKey('navbar')
    }
}

export default Navbar;
