import Layout from "antd/es/layout";
import {Avatar, Badge, Menu,Dropdown} from "antd";
import React, {useEffect, useState} from "react";
import {AuthService} from "../services/authService";
import {BellTwoTone} from '@ant-design/icons';
import {FetchApi} from "../utils/modules";
import {withRouter} from 'react-router-dom';
import {NotificationService} from "../services/notificationService";
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
        overflowY:'scroll',
        position:'relative'
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
    },
    notiFooter:{
        textDecoration:'underline',
        textAlign:'center',
        cursor:'pointer'
    }

}
const CustomHeader = (props)=>{
    const [listNoti,setListNoti] = useState([]);
    const [nextPage,setNextPage] = useState(0);

    const loadNotify = ()=>{
        FetchApi.getNotifications(nextPage)
            .then((res)=>{

                if(res.nextPage === ''){
                    setNextPage(nextPage + 1)
                } else {
                    setNextPage(-1)
                }

                setListNoti(listNoti.concat(res.data));
            })

    }


    useEffect(loadNotify,[])



    const navigate = (index)=> {
        NotificationService.set(listNoti[index])
        props.history.push('/notification-detail')
    }

    const renderSeeMore = ()=>{
        if(nextPage > 0){
            return (
                    <Menu.Item style={styles.notiFooter} key="see-more" onClick={()=>loadNotify()}>
                        <span >Xem thêm</span>
                    </Menu.Item>
            )
        }
        return;
    }

    const renderMenu = (

            <Menu style={styles.notifyWrap}>
                <Menu.Item key="0">
                    <span style={styles.notiHeader}>Thông báo</span>
                </Menu.Item>
                <Menu.Divider/>
                {
                    listNoti.map((noti,index) => (
                        <Menu.Item key={noti.id} onClick={()=>navigate(index)}>
                            <span style={styles.notiContent}>{noti.title}</span>
                            <p style={styles.notiTime}>{new Date(noti.createdTime).toLocaleString()}</p>
                        </Menu.Item>
                    ))
                }
                <Menu.Divider/>

                {renderSeeMore()}
            </Menu>

    );

    const {userName} = AuthService.get();


    return(
                    <Header style={styles.headerWrap}>
                        <Dropdown  overlay={renderMenu} trigger={['click']}>
                            <Badge count={1} className="ant-dropdown-link">
                                <BellTwoTone style={{fontSize:24}}/>
                            </Badge>
                        </Dropdown>

                        <span style={styles.username}>{userName}</span>
                        <Avatar style={styles.avatar} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />

                    </Header>
    )
}


export default withRouter(CustomHeader);
