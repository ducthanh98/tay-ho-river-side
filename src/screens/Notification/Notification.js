import React, {useState} from 'react';
import {Input,Button,Form} from "antd";
import {NotificationStyles} from './NotificationStyles';
import ListReceiverModal from "./components/ListReceiverModal";
import ListReceiver from "./components/ListSelected";

const Notification = ()=> {
    const [listReceiver,setListReceiver] = useState([])
    const [showModal,setShowModal] = useState(false)

    const renderReceiver = ()=>(
        <>
            <p style={NotificationStyles.comboboxLabel}>Người nhận</p>
            <ListReceiver setListReceiver={setListReceiver} listReceiver={listReceiver} handleShowModal={setShowModal} />
        </>
    );

    const renderTitle = ()=>(
        <>
            <p style={NotificationStyles.comboboxLabel}>Tiêu đề</p>
            <Input style={{ width: '100%' }} />
        </>
    );

    const renderDescription = ()=>(
        <>
            <p style={NotificationStyles.comboboxLabel}>Nội dung</p>
            <Input.TextArea  style={{ width: '100%',height:'100px' }} />
        </>
    )

    const formItems =[
        {
            key:0,
            name:'receiver',
            render: renderReceiver()
        },
        {
            key:1,
            name:'title',
            render:renderTitle()
        },
        {
            key:2,
            name:'description',
            render: renderDescription()
        }
    ]

    const onFinish = value =>{
        console.log(value);
    }

    return (
            <div className={'h-100'}>
                <p style={NotificationStyles.titlePage}>Tạo thông báo</p>

                <Form onFinish={onFinish}>
                    {
                        formItems.map(item => (
                            <Form.Item
                            key={item.key}
                            name={item.name}
                            >
                                {item.render}
                            </Form.Item>
                        ))
                    }
                    <Button htmlType={"submit"} style={NotificationStyles.sendBtn} >Gửi đi</Button>

                </Form>
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
