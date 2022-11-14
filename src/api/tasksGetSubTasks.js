import axios from 'axios'

const getSubTasksReq = (url, args) => {
    const {taskId} = args

    console.log(taskId)
    return axios.get(url, {
        withCredentials: true,
        params: {
            taskId
        }
    })
}

export default getSubTasksReq