import React from 'react';
import Modal from "antd/es/modal";

const styles ={
    textBold:{
        fontWeight:'bold',
    }
}

const UserInfoModal = ({dataModal,visible,setShowModal})=> {
        return (
            <div>
                <Modal
                    title={dataModal.name}
                    visible={visible}
                    onCancel={()=>setShowModal(false)}
                    footer=''
                >
                    <p> Tên căn hộ : <span style={styles.textBold}>{dataModal.apartment_name}</span> </p>
                    <p> Ngày đăng ký : <span style={styles.textBold}>{dataModal.date}</span> </p>
                    <p> Hình thức thanh toán : </p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </Modal>
            </div>
        );
}

export default UserInfoModal;
