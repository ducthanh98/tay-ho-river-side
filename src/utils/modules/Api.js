import {baseURL} from "../config";

const Api = {

    login:`${baseURL}/api/v1/user/login`,
    notification:(page=0)=> `${baseURL}/api/v1/notification/all?page=${page}`,
    allOrder:(page=0)=> `${baseURL}/api/v1/order/all?page=${page}`,
    searchOrder:(page=0,keyword='')=> `${baseURL}/api/v1/order/search?page=${page}&keyword=${keyword}`,
    createNotification:`${baseURL}/api/v1/notification`,
    uploadFile: `${baseURL}/api/v1/file/upload`,
    putInfo: `${baseURL}/api/v1/project`,
    getInforManager: `${baseURL}/api/v1/project`,


}

export {Api}
