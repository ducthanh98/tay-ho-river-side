import Layout from "antd/es/layout";
import {Avatar,Badge} from "antd";
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
    }

}
const CustomHeader = ()=>{

        return(
            <Header style={styles.headerWrap}>
                <Badge count={1}>
                    <Avatar shape="square"  icon="bell" />
                </Badge>
                <span style={styles.username}>Nguyen Dong Anh</span>
                <Avatar style={styles.avatar} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </Header>

        )
}


export default CustomHeader;
