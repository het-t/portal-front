import axios from 'axios'

const createTaskReq = (url, args) => {
    const {title, cost, saved} = args

    return axios.get(url, {
        withCredentials: true,
        params: {
            title,
            cost,
            saved
        }
    })
}

export default createTaskReq