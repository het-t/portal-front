import axios from 'axios'

const getTasksReq = (url) => {

    return axios.get(url, {
        withCredentials: true,
    })
}

export default getTasksReq