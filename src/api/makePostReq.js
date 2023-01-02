import axios from './axiosInstance.js'

const makePostReq = (url, args) => {
    return axios.post(url, {
        params: args
    }, {
        withCredentials: true,
    })
}

export default makePostReq