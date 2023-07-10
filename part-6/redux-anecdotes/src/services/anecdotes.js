import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

// retrieve all anecdotes from server
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// create a new anecdote 
const create = async content => {
  const anecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

// update anecdote
const update = async (id, object) => {
  const response = await axios.put(`${baseUrl}/${id}`, object)
  return response.data
}

export default { getAll, create, update }