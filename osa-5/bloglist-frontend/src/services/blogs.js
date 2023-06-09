import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const create = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blog, config)
  return response
}

const remove = async (id) => {
  const response = await axios.delete(baseUrl+'/'+id)
  return response
}

const update = async (id, blog) => {
  console.log(baseUrl+'/'+id)
  const response = await axios.put(baseUrl+'/'+id, blog)
  return response
}


export default { getAll, create, remove, update, setToken }