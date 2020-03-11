import React, {useEffect, useRef, useState} from 'react';
import './CustomerManagement.css';
import {Table} from 'antd';
import {LoadingService} from "../../services";
import {FetchApi} from "../../utils/modules";
const CustomerManagement = ()=> {

    const [dataSource,setDataSource] = useState([]);
    const dataSourceRef = useRef([])
    // const [showModal,setShowModal] = useState(false);
    // const [dataModal,setDataModal]  = useState({})

    let currentPage = 0;

    const columns = [
            {
                title: 'Người mua',
                dataIndex: 'userName',
                key: 'userName',
                render: text => <p className={'text-bold'}>{text}</p>,
            },
            {
                title: 'Điện thoại',
                dataIndex: 'phone',
                key: 'phone',
                render: text => <p >{text}</p>,
            },
            {
                title: 'Địa chỉ',
                dataIndex: 'address',
                key: 'address',
                render: text => <p >{text}</p>,
            },
            {
                title:'Loại căn hộ',
                dataIndex:'apartmentType',
                key:'apartment_name',
                render: text => <p>{text}</p>,
            },
            {
                title:'Email',
                dataIndex:'email',
                key:'email',
                render: text => <p >{text}</p>,

            },
            // {
            //     title:'Thanh toán',
            //     dataIndex:'requestLoan',
            //     key:'requestLoan',
            //     render: text => <p className={'text-bold'}>{text}</p>,
            // },
            {
                title:'Ngày đăng ký',
                dataIndex:'createdTime',
                key:'createdTime',
                render: text => <p >{new Date(text).toLocaleDateString()}</p>,

            }
        ];

    const loadListCustomer = async () => {

        if (currentPage < 0) return;
        LoadingService.setAndBroadcast(true);

        const res = await FetchApi.getListReceiver(currentPage);


        if (res.nextPage) {
            currentPage = currentPage + 1;
        } else {
            currentPage = -1;
        }


        dataSourceRef.current = dataSourceRef.current.concat(res.data);
        setDataSource(dataSourceRef.current);


        LoadingService.setAndBroadcast(false);
    };




    useEffect(()=>{
        loadListCustomer()

       setTimeout(()=>{

           const layout = document.querySelector('.ant-layout section');

           layout.addEventListener('scroll',()=>{


               if (layout.scrollTop === layout.scrollHeight - layout.clientHeight) {
                   loadListCustomer();
               }


           })
       })

    },[])


    //
    // const onRow=(record, rowIndex) => {
    //         return {
    //             onClick: (event)=>{renderModal(event,record)}
    //     };
    // }
    // const renderModal = (event,record)=>{
    //     setShowModal(true);
    //     setDataModal(record);
    // }

        return (
            <div>
                <p style={{marginBottom:'40px'}} className={'title-page'}>Quản lý người mua</p>

                <Table  rowKey="id" dataSource={dataSource} columns={columns} pagination={false}/>
                {/*<UserInfoModal  visible={showModal}*/}
            </div>
        );
}

export default CustomerManagement;

