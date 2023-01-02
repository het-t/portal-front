import axios from './axiosInstance.js'

const makeGetReq = (url, args) => {
    return axios.get(url, {
        withCredentials: true,
        params: args
    })
}

export default makeGetReq