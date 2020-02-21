import Layout from "antd/es/layout";
import {Avatar,Badge} from "antd";
import React, {Component, useState} from "react";
import {AuthService} from '../services/authService'


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
    }

}
class CustomHeader extends Component{
    state = {
        userInfo: AuthService.get().userInfo
    }

    componentDidMount(){
        AuthService.onChange('header',()=>{
            this.setState({userInfo:AuthService.get().userInfo})
        });
    }

    render() {
        return(
            <>
                {
                    this.state.userInfo &&
                    <Header style={styles.headerWrap}>
                        <Badge count={1}>
                            <Avatar shape="square"  icon="bell" />
                        </Badge>
                        <span style={styles.username}>Nguyen Dong Anh</span>
                        <Avatar style={styles.avatar} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    </Header>
                }
            </>

        )
    }
    componentWillUnmount() {
        AuthService.deleteKey('header')
    }
}


export default CustomHeader;
