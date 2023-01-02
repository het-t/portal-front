import axios from 'axios'

export default axios.create({
    // baseURL: process.env.NODE_ENV === 'development' ? '' : 'http://113.212.87.157:9025/',
    baseURL: '/'
});