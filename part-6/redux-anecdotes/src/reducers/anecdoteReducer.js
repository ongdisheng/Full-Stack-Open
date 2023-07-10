import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a => a.id !== id ? a : changedAnecdote) 
    },
    createAnecdote(state, action) {
      const newAnecdote = asObject(action.payload)
      return state.concat(newAnecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { incrementVote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer