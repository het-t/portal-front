import axios from 'axios'

const getUsersReq = (url, {from, recordsPerPage}) => {
    return axios.get(url, {
        withCredentials: true,
        params: {
            from: from,
            records_per_page: recordsPerPage
        }
    })
}

export default getUsersReq