import axios from './axiosInstance.js'

const makeDeleteReq = (url, args) => {
    return axios.delete(url, {
        withCredentials: true,
        params: args
    })
}

export default makeDeleteReq