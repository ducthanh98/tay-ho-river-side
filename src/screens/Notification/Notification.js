import React, { useState} from 'react';
import {Input, Button, Form, notification} from "antd";
import {NotificationStyles} from './NotificationStyles';
import ListReceiverModal from "./components/ListReceiverModal";
import ListReceiver from "./components/ListSelected";
import {LoadingService} from "../../services/loadingService";
import {FetchApi} from "../../utils/modules";
import {withRouter} from "react-router-dom";

const Notification = (props)=> {
    const [listReceiver,setListReceiver] = useState([])
    const [showModal,setShowModal] = useState(false)

    const formItems =[
        {
            key:0,
            label:'Người nhận',
            render: <ListReceiver setListReceiver={setListReceiver} listReceiver={listReceiver} handleShowModal={setShowModal} />
        },
        {
            key:1,
            name:'title',
            label:'Tiêu đề',
            rules:[
                {
                    required: true,
                    message: 'Vui lòng nhập tiêu đề',
                }
            ],
            render:<Input style={{ width: '100%' }} />
        },
        {
            key:2,
            name:'description',
            label:'Mô tả',
            rules:[
                {
                    required: true,
                    message: 'Vui lòng nhập mô tả',
                }
            ],
            render: <Input.TextArea  style={{ width: '100%',height:'100px' }} />
        }
    ]

    const onFinish = async values =>{
        try {

            values.type = listReceiver.length ? 'some' : 'all';
            values.deviceId = listReceiver.map(v => v.id);

            
            LoadingService.setAndBroadcast(true);
            const res = await FetchApi.createNotification(values)


            if (res.status === 200) {
                props.history.push('/notification-detail',res.data)

            } else {
                throw Error(res.message)
            }


        } catch (e) {

            notification["error"]({message: "Error", description: e.message});

        } finally {
            LoadingService.setAndBroadcast(false);
        }

    }

    return (
            <div className={'h-100'}>
                <p style={NotificationStyles.titlePage}>Tạo thông báo</p>

                <Form onFinish={onFinish}>
                    {
                        formItems.map(item => (
                            <div key={item.key}>
                                <p style={NotificationStyles.comboboxLabel}>{item.label}</p>

                                <Form.Item
                                name={item.name}
                                rules={item.rules}
                                >
                                    {item.render}
                                </Form.Item>
                            </div>
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

export default withRouter(Notification);