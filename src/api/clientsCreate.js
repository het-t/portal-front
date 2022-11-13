import axios from 'axios'

const createClientReq = (url, args) => {
    const {clientName, clientType, cin, firmName, firmAddress, caPanDetail, caEmail, conName, conEmail, conPhone} = args
    
    return axios.get(url, {
        withCredentials: true,
        params: {
            clientName,
            cin,
            clientType,
            firmName,
            firmAddress,
            caPanDetail,
            caEmail,
            conName, 
            conEmail,
            conPhone
        }
    })
}

export default createClientReq