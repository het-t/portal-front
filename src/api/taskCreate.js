import axios from 'axios'

const createTaskReq = (url, args) => {
    const {title, cost, saved, subTasks} = args

    return axios.get(url, {
        withCredentials: true,
        params: {
            title,
            cost,
            saved,
            subTasks: JSON.stringify(subTasks)
        }
    })
}

export default createTaskReq