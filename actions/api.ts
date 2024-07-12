import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { tokenManagement } from '@/stores/tokenManagement';

const instance:AxiosInstance = axios.create({ baseURL: "http://127.0.0.1:8000/api/" })
// const instance:AxiosInstance = axios.create({ baseURL: "http://192.168.43.150:8000/api/" })
instance.interceptors.request.use(async (config) => {
    const token = await tokenManagement.getJwt()
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

export const api:AxiosInstance = instance