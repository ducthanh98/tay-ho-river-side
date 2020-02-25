import React, {useState} from 'react';
import {Input,Button} from "antd";
import {NotificationStyles} from './NotificationStyles';
import ListReceiverModal from "./components/ListReceiverModal";
import ListReceiver from "./components/ListSelected";

const Notification = ()=> {
    const [listReceiver,setListReceiver] = useState([])
    const [showModal,setShowModal] = useState(false)

    return (
            <div className={'h-100'}>
                <p style={NotificationStyles.titlePage}>Tạo thông báo</p>

                <p style={NotificationStyles.comboboxLabel}>Người nhận</p>
                <ListReceiver setListReceiver={setListReceiver} listReceiver={listReceiver} handleShowModal={setShowModal} />

                <p style={NotificationStyles.comboboxLabel}>Tiêu đề</p>
                <Input style={{ width: '100%' }} />

                <p style={NotificationStyles.comboboxLabel}>Nội dung</p>
                <Input.TextArea  style={{ width: '100%',height:'100px' }} />

                <Button style={NotificationStyles.sendBtn} >Gửi đi</Button>
                <ListReceiverModal
                    setListReceiver={setListReceiver}
                    listReceiver={listReceiver}
                    showModal={showModal}
                    handleShowModal={setShowModal}
                />
            </div>
    );
}

export default Notification;
