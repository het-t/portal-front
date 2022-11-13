import axios from 'axios'

const getClientsReq = (url) => {   
    return axios.get(url, {
        withCredentials: true,
    })
}

export default getClientsReq