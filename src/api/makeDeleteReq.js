import axios from './axiosInstance.js'

export default function makeDeleteReq (url, args) {
    return axios.delete(url, {
        withCredentials: true,
        params: args
    })
}