import axios from 'axios'


const getAll = (url) => {
    const request = axios.get(url)
    return request
}

export default {getAll}