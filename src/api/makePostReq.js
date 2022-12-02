import axios from 'axios'

const makePostReq = (url, args) => {
    return axios.post(url, {
        params: args
    }, {
        withCredentials: true,
    })
}

export default makePostReq