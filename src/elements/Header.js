import Layout from "antd/es/layout";
import {Avatar, Badge, Menu,Dropdown} from "antd";
import React from "react";


const { Header } = Layout;

const styles ={
    avatar:{
        marginRight:'20px'
    },
    username:{
        marginRight: '10px',
        marginLeft:'10px',
        fontFamily: 'Roboto, sans-serif',
        color: '#032A47',
        fontWeight:'500'
    },
    headerWrap:{
        backgroundColor: '#fff',
        padding: 0,
        textAlign:'end',
        borderBottom: '1px solid #C2C2C229'
    },
    notifyWrap:{
        width:'300px',
        maxHeight:'360px',
        overflowY:'scroll'
    },
    notiHeader:{
        fontWeight:'bold',
        fontSize:'15px',
    },
    notiContent:{
        fontWeight:'bold',
        color:'##171717',
        fontSize:'13px'
    },
    notiTime:{
        color:'#8E8E8E',
        fontSize:'12px'
    }

}
const CustomHeader = ()=>{
    const renderMenu = (
        <Menu style={styles.notifyWrap}>
            <Menu.Item key="0">
                <span style={styles.notiHeader}>Thông báo</span>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="1">
                <span style={styles.notiContent}>Trần Bình đã thêm 3 căn hộ mới</span>
                <p style={styles.notiTime}>6:00 am  18/02/2020</p>
            </Menu.Item>
            <Menu.Item key="2">
                <span style={styles.notiContent}>Trần Bình đã thêm 3 căn hộ mới</span>
                <p style={styles.notiTime}>6:00 am  18/02/2020</p>
            </Menu.Item>
            <Menu.Item key="3">
                <span style={styles.notiContent}>Trần Bình đã thêm 3 căn hộ mới</span>
                <p style={styles.notiTime}>6:00 am  18/02/2020</p>
            </Menu.Item>
            <Menu.Item key="4">
                <span style={styles.notiContent}>Trần Bình đã thêm 3 căn hộ mới</span>
                <p style={styles.notiTime}>6:00 am  18/02/2020</p>
            </Menu.Item>
            <Menu.Item key="5">
                <span style={styles.notiContent}>Trần Bình đã thêm 3 căn hộ mới</span>
                <p style={styles.notiTime}>6:00 am  18/02/2020</p>
            </Menu.Item>
            <Menu.Item key="6">
                <span style={styles.notiContent}>Trần Bình đã thêm 3 căn hộ mới</span>
                <p style={styles.notiTime}>6:00 am  18/02/2020</p>
            </Menu.Item>
            <Menu.Item key="7">
                <span style={styles.notiContent}>Trần Bình đã thêm 3 căn hộ mới</span>
                <p style={styles.notiTime}>6:00 am  18/02/2020</p>
            </Menu.Item>
            <Menu.Item key="8">
                <span style={styles.notiContent}>Trần Bình đã thêm 3 căn hộ mới</span>
                <p style={styles.notiTime}>6:00 am  18/02/2020</p>
            </Menu.Item>

        </Menu>
    );
    return(
                    <Header style={styles.headerWrap}>
                        <Dropdown overlay={renderMenu} trigger={['click']}>
                            <Badge count={1} className="ant-dropdown-link">
                                <Avatar shape="square"  icon="bell" />
                            </Badge>
                        </Dropdown>

                        <span style={styles.username}>Nguyen Dong Anh</span>
                        <Avatar style={styles.avatar} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />

                    </Header>
    )
}


export default CustomHeader;
