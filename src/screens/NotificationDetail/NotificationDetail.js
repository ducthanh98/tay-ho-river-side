import React from 'react';
import { PageHeader } from 'antd';
import {NotificationDetailStyles} from './NotificationDetailStyles'
const NotificationDetail = (props) => {
    return (
        <div>
            <PageHeader
            onBack={() => null}
            title="Quay lại"
            />
            <p style={NotificationDetailStyles.notiHeader}>Trần Bình đã thêm 3 căn hộ mới</p>
            <p style={NotificationDetailStyles.notiTime}>6:00 am 18/02/2020</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    );
};

export default NotificationDetail;
