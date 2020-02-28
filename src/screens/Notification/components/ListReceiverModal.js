import React, {useEffect, useState} from 'react';
import { Modal, Button,Input,Row, Col ,Table } from 'antd';

const styles = {
    selectBtn:{
        backgroundColor:'#032A47',
        color:'#FFFFFF',
        width:'130px'
    }
}

const ListReceiverModal =(props)=> {
        const [selectedRowKeys,setSelectedRowKeys] = useState([]);

        const dataSource = [
            {
                key: '1',
                name: 'John Brown',
                tel:'0918279888' ,
                address: 'New York No. 1 Lake Park',
                apartment_name: '1020',
                floor:10,
                price:1260,
                pay:'Vay vốn',
                date:'13/02/2020'
            },
            {
                key: '2',
                name: 'John Brown',
                tel:'0918279888' ,
                address: 'New York No. 1 Lake Park',
                apartment_name: '1020',
                floor:10,
                price:1260,
                pay:'Vay vốn',
                date:'13/02/2020'
            },
            {
                key: '3',
                name: 'John Brown',
                tel:'0918279888' ,
                address: 'New York No. 1 Lake Park',
                apartment_name: '1020',
                floor:10,
                price:1260,
                pay:'Vay vốn',
                date:'13/02/2020'
            },
            {
                key: '4',
                name: 'John Brown',
                tel:'0918279888' ,
                address: 'New York No. 1 Lake Park',
                apartment_name: '1020',
                floor:10,
                price:1260,
                pay:'Vay vốn',
                date:'13/02/2020'
            },
            {
                key: '5',
                name: 'John Brown',
                tel:'0918279888' ,
                address: 'New York No. 1 Lake Park',
                apartment_name: '1020',
                floor:10,
                price:1260,
                pay:'Vay vốn',
                date:'13/02/2020'
            },
            {
                key: '6',
                name: 'John Brown',
                tel:'0918279888' ,
                address: 'New York No. 1 Lake Park',
                apartment_name: '1020',
                floor:10,
                price:1260,
                pay:'Vay vốn',
                date:'13/02/2020'
            },
            {
                key: '7',
                name: 'John Brown',
                tel:'0918279888' ,
                address: 'New York No. 1 Lake Park',
                apartment_name: '1020',
                floor:10,
                price:1260,
                pay:'Vay vốn',
                date:'13/02/2020'
            },
            {
                key: '8',
                name: 'John Brown',
                tel:'0918279888' ,
                address: 'New York No. 1 Lake Park',
                apartment_name: '1020',
                floor:10,
                price:1260,
                pay:'Vay vốn',
                date:'13/02/2020'
            },

        ];

        const columns = [
            {
                title: 'Người mua',
                dataIndex: 'name',
                key: 'name',
                render: text => <p className={'text-bold'}>{text}</p>,
            },
            {
                title: 'Điện thoại',
                dataIndex: 'tel',
                key: 'tel',
                render: text => <p >{text}</p>,
            },
            {
                title: 'Địa chỉ',
                dataIndex: 'address',
                key: 'address',
                render: text => <p >{text}</p>,
            },
            {
                title:'Tên căn hộ',
                dataIndex:'apartment_name',
                key:'apartment_name',
                render: text => <p className={'text-bold'}>{text}</p>,
            }
        ];

        useEffect(()=>{
            setSelectedRowKeys(props.listReceiver.map(x => x.key))
        },[props.listReceiver])

        const rowSelection = {
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                props.setListReceiver(selectedRows)
            },
        };
        return (
            <Modal
                visible={props.showModal}
                title="Danh sách người nhận"
                onCancel={()=>props.handleShowModal(false)}
                footer=''
                width={'800px'}
                bodyStyle={{maxHeight:"450px",overflow:'scroll'}}
            >
                <Row type="flex" justify="space-between">
                    <Col span={10}>
                        <Input placeholder="Tìm kiếm" />
                    </Col>
                    <Col span={4}>
                        <Button style={styles.selectBtn}>Chọn</Button>
                    </Col>
                </Row>
                <br/>
                <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} />;
            </Modal>
        );
}

export default ListReceiverModal;
