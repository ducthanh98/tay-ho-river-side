import React, {Component} from 'react';
import './CustomerManagement.css';
import {Select, Table} from 'antd';
import { Row, Col } from 'antd';
import UserInfoModal from "./components/UserInfoModal";
class CustomerManagement extends Component {
    state = {
        columns :[
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
            },
            {
                title:'Tầng',
                dataIndex:'floor',
                key:'floor',
                render: text => <p >{text}</p>,

            },
            {
                title:'Giá',
                dataIndex:'price',
                key:'price',
                render: text => <p >{this.formatCurrency(text) } triệu</p>,
            },
            {
                title:'Thanh toán',
                dataIndex:'pay',
                key:'pay',
                render: text => <p className={'text-bold'}>{text}</p>,
            },
            {
                title:'Ngày đăng ký',
                dataIndex:'date',
                key:'date',
                render: text => <p >{text}</p>,

            }
        ],
        dataSource:[
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

        ],
        visible:false,
        dataModal : {}
    }


    formatCurrency = (price, separate = ".")=>{
        const str = price.toString();
        const regex = /\B(?=(\d{3})+(?!\d))/g;
        const result = str.replace(regex, separate);
        return result;
    }

    onRow=(record, rowIndex) => {
            return {
                onClick: (event)=>{this.renderModal(event,record)}
        };
    }
    renderModal = (event,record)=>{
        this.setState({visible:true,dataModal:record})
    }
    handleCancel = e => {
        this.setState({visible: false,});
    };
    render() {

        return (
            <div>
                <p className={'title-page'}>Quản lý người mua</p>


                <Row className={'critieria-wrap'}>
                    <Col span={5}>
                        <p className={'combobox-label'}>Tầng điển hình</p>
                        <Select
                            style={{ width: 200 }}
                            defaultValue={"1-18"}
                        >
                            <Select.Option  value="1-18">Tầng 1- 18</Select.Option>
                            <Select.Option  value="7-19">Tầng 7- 19</Select.Option>
                        </Select>
                    </Col>
                    <Col span={5}>
                        <p className={'combobox-label'}>Thanh toán</p>
                        <Select
                            style={{ width: 200 }}
                            defaultValue={"loan"}
                        >
                            <Select.Option  value="loan">Vay vốn</Select.Option>
                        </Select>
                    </Col>
                </Row>
                <Table onRow={this.onRow} dataSource={this.state.dataSource} columns={this.state.columns} />;
                <UserInfoModal visible={this.state.visible} dataModal={this.state.dataModal} handleCancel={this.handleCancel}/>
            </div>
        );
    }
}

export default CustomerManagement;

