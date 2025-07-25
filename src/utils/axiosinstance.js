import axios from "axios"
import {BASE_URL} from './constants'

const axiosInstance =axios.create({
    baseURL: BASE_URL,
    timeOut:10000,
    headers:{
        "content-type":"application/json"
    },
});

axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken=localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization =`Bearer ${accessToken}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);


export default axiosInstance;