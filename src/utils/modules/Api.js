import {baseURL} from "../config";

const Api = {
    login:()=> `${baseURL}/api/v1/user/login`,
    notification:(page=0)=> `${baseURL}/api/v1/notification/all?page=${page}`,
    getInforManager: () => `${baseURL}/api/v1/project`,
    uploadFile: () => `${baseURL}/api/v1/file/upload`,
    putInfo: () => `${baseURL}/api/v1/project`
}

export {Api}
