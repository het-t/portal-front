import axios from 'axios'

export default axios.create({
    baseURL: window.location.hostname === 'localhost'
             ? "/api" 
             :"https://corporatetasks.com/api/"
});