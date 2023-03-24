import axios from 'axios'
const url = 'https://puhelinluettelo-backend-71l4.onrender.com/api/persons'


const getAll = () => {
    const request = axios.get(url)
    return request
}

const create = newObject => {
    const request = axios.post(url, newObject)
    return request
}

const update = (id, newObject) => {
    const request = axios.put(`${url}/${id}`, newObject)
    return request
}

const remove = (id) => {
    const request = axios.delete(`${url}/${id}`)
    return request
}

export default {getAll, create, update, remove}