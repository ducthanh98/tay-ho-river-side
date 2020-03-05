import {baseURL} from "../config";

const Api = {
    login:`${baseURL}/api/v1/user/login`,
    notification:(page=0)=> `${baseURL}/api/v1/notification/all?page=${page}`,
    order:(page=0)=> `${baseURL}/api/v1/order/all?page=${page}`,
    createNotification:`${baseURL}/api/v1/notification`

}

export {Api}
