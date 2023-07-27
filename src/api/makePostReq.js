import axios from './axiosInstance.js'

export default function makePostReq (url, args) {
    return axios.post(url, {
        params: args
    }, {
        withCredentials: true,
    })
}