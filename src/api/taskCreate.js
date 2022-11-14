import axios from 'axios'

const createTaskReq = (url, args) => {
    const {title, cost, saved, subTasks, coordinatorId, clientId} = args

    return axios.get(url, {
        withCredentials: true,
        params: {
            title,
            cost,
            saved,
            coordinatorId,
            clientId,
            subTasks: JSON.stringify(subTasks)
        }
    })
}

export default createTaskReq