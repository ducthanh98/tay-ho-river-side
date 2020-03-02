import React from 'react';
import { PageHeader } from 'antd';
import {NotificationDetailStyles} from './NotificationDetailStyles'
import {NotificationService} from "../../services/notificationService";
import {withRouter} from 'react-router-dom';

const NotificationDetail = (props) => {
    const noti = NotificationService.get();

    const renderContent = ()=>{
        if(noti){
            return (
                <>
                    <p style={NotificationDetailStyles.notiHeader}>{noti.title}</p>
                    <p style={NotificationDetailStyles.notiTime}>{new Date(noti.createdTime).toLocaleString()}</p>
                    <p>{noti.description}</p>
                </>
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
