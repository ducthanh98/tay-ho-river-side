import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Input, Row, Col, Table } from "antd";
import { FetchApi } from "../../../utils/modules";
import { LoadingService } from "../../../services/loadingService";

const styles = {
  selectBtn: {
    backgroundColor: "#032A47",
    color: "#FFFFFF",
    width: "130px"
  }
};

const ListReceiverModal = props => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const currentPageRef = useRef(0);

  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: "Người mua",
      dataIndex: "userName",
      key: "userName",
      render: text => <p className={"text-bold"}>{text}</p>
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: text => <p>{text}</p>
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: text => <p>{text}</p>
    },
    {
      title: "Tên căn hộ",
      dataIndex: "apartmentType",
      key: "apartmentType",
      render: text => <p className={"text-bold"}>{text}</p>
    }
  ];

  const loadListReceiver = useCallback(async () => {
    if (currentPageRef.current < 0) return;
    LoadingService.setAndBroadcast(true);

    const res = await FetchApi.getListReceiver(currentPageRef.current);

    if (res.nextPage) {
      currentPageRef.current = currentPageRef.current + 1;
    } else {
      currentPageRef.current = -1;
    }

    setDataSource(dataSource.concat(res.data));
    LoadingService.setAndBroadcast(false);
  });

  useEffect(() => {
    setSelectedRowKeys(props.listReceiver.map(x => x.id));
  }, [props.listReceiver]);

  useEffect(() => {
    loadListReceiver();
  }, [loadListReceiver]);

  useEffect(() => {
    //FIXME: nếu sử dụng biến modalScrollEvent trong scope của  useEffect thì thực ra
    // em sẽ không quản lý được chính xác số lượng timeout được tạo ra.
    //khi nào lên công ty a sẽ ví dụ cho phần này để dễ hiểu hơn.
    let modalScrollEvent;
    if (props.showModal) {
      modalScrollEvent = setTimeout(() => {
        const modalBody = document.querySelector(
          ".list-receiver .ant-modal-body"
        );
        modalBody.addEventListener("scroll", () => {
          if (
            modalBody.scrollTop ===
            modalBody.scrollHeight - modalBody.clientHeight
          ) {
            loadListReceiver();
          }
        });
      });
    }

    return () => clearTimeout(modalScrollEvent);
  }, [loadListReceiver, props.showModal]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      props.setListReceiver(selectedRows);
    }
  };

  return (
    <Modal
      className="list-receiver"
      visible={props.showModal}
      title="Danh sách người nhận"
      onCancel={() => props.handleShowModal(false)}
      footer=""
      width={"800px"}
      bodyStyle={{ maxHeight: "450px", minHeight: "450px", overflow: "scroll" }}
    >
      <Row type="flex" justify="space-between">
        <Col span={10}>
          <Input placeholder="Tìm kiếm" />
        </Col>
        <Col span={4}>
          <Button style={styles.selectBtn}>Chọn</Button>
        </Col>
      </Row>
      <br />
      <Table
        pagination={false}
        rowKey={"id"}
        rowSelection={rowSelection}
        dataSource={dataSource}
        columns={columns}
      />
    </Modal>
  );
};

export default ListReceiverModal;
