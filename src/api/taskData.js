import axios from 'axios'

const getTaskDataReq = (url, args) => {

    const {taskId} = args

    return axios.get(url, {
        withCredentials: true,
        params: {
            taskId,
        }
    })
}

export default getTaskDataReq