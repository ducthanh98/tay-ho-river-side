import React from 'react';
import {Menu, Layout} from "antd";
import {ContainerTwoTone} from '@ant-design/icons'
import {Link } from "react-router-dom";
import Rectangle from '../assets/images/Rectangle 813.png'
import {AuthService} from "../services/authService";
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

const Navbar =()=>{

    const logout = async ()=>{
        localStorage.removeItem('userInfo');
        AuthService.setAndBroadcast(null)
    }

        return (

                    <Sider>
                        <div style={styles.logo}>
                            <ContainerTwoTone style={{paddingRight: '10px'}} />
                            TayHoRiverview
                        </div>
                            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                                {/* <SubMenu
                                    key="1"
                                    title={
                                        <Link to={''}>
                                            <img src={require('../assets/images/business-24px.svg')} alt={'business'}/> &nbsp;
                                            <span>Quản lý dự án</span>
                                        </Link>
                                    }
                                >
                                    <Menu.Item key="6">Quản lý tòa nhà</Menu.Item>
                                    <Menu.Item key="7">Quản lý mặt bằng</Menu.Item>
                                </SubMenu>

                        <SubMenu
                            key="2"
                            title={
                                <Link to={''}>
                                    <img src={require('../assets/images/Icon_quản_lý_căn_hộ.svg')} alt={'business'}/> &nbsp;
                                    <span>Quản lý căn hộ</span>
                                </Link>
                            }
                        >
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu> */}
                        <Menu.Item key="1">
                            <Link to={'/infor-management'}>
                              <img src={require('../assets/images/business-24px.svg')} alt={'business'}/> &nbsp;
                              <span>Quản lý dự án</span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="3">
                            <Link to={'/customer-management'}>
                                <img src={require('../assets/images/contacts-24px.svg')} alt={'contact'}/> &nbsp;
                                <span>Quản lý người mua</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to={'/notifications'}>
                                <img src={require('../assets/images/post_add-24px.svg')} alt={'notification'}/> &nbsp;
                                <span>Tạo thông báo</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to={'/login'} onClick={logout}>
                                <img src={require('../assets/images/power_settings_new-24px.svg')} alt={'logout'}/> &nbsp;
                                <span>Đăng xuất</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                <img style={styles.rectangle} src={require('../assets/images/Rectangle 813.png')} alt='rectangle'/>
            </Sider>
        );

}

export default Navbar;
