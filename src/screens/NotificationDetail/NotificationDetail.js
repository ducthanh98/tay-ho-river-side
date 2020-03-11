import React from 'react';
import { PageHeader } from 'antd';
import {NotificationDetailStyles} from './NotificationDetailStyles'
import {withRouter} from 'react-router-dom';

const NotificationDetail = (props) => {
    const noti = props.location.state

    const renderContent = ()=>{
        if(noti){
            return (
                <div style={NotificationDetailStyles.notiWrap}>
                    <p style={NotificationDetailStyles.notiHeader}>{noti.title}</p>
                    <p style={NotificationDetailStyles.notiTime}>{new Date(noti.createdTime).toLocaleString()}</p>
                    <p>{noti.description}</p>
                </div>
            )
        }
        return;
    }


    return (
        <div>
            <PageHeader
            onBack={() => props.history.goBack()}
            title="Quay lại"
            />
            {renderContent()}
        </div>
    );
};

export default withRouter(NotificationDetail);
