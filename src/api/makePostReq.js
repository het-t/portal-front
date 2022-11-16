import axios from 'axios'

const makePostReq = (url, args) => {
    return axios.get(url, {
        params: args
    }, {
        withCredentials: true,
    })
}

export default makePostReq