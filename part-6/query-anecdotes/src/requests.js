import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => 
  axios.get(baseUrl).then(res => res.data)

export const create = (anecdote) => 
  axios.post(baseUrl, anecdote).then(res => res.data)

export const updateVote = (anecdote) => 
  axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then(res => res.data)