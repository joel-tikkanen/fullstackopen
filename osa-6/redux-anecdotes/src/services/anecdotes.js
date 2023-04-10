import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    console.log(content)
    const response = await axios.post(baseUrl, {content: content, votes: 0})
    return response.data
}

const getById = async (id) => {
    const response = await axios.get(baseUrl+'/'+id)
    return response.data
}



const vote = async id => {
    const theAnecdote = await getById(id)
    console.log(theAnecdote)
    theAnecdote.votes += 1
    const response = await axios.put(baseUrl+'/'+id, theAnecdote)
    console.log(response.data)
    return response.data
}

export default { getAll, createNew, vote }