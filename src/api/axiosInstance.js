import axios from 'axios'
console.log(process.env.VUE_API_BASE_URL)
export default axios
.create({
    baseURL: 'http://113.212.87.157:9025/',
    // baseUrl: process.env.VUE_API_BASE_URL,
});