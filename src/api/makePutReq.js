import axios from './axiosInstance.js'

export default function makePutReq (url, args) {
    return axios.put(url, {
        withCredentials: true,
        params: args
    })
}