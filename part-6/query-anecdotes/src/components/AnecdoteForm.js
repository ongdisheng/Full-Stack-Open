import { useMutation, useQueryClient } from "react-query"
import { create } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()

  // define mutation
  const newAnecdoteMutation = useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      dispatchNotification({ type: 'SET', payload: 'too short anecdote, must have length 5 or more' })
      setTimeout(() => {
        dispatchNotification({ type: 'CLEAR' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    dispatchNotification({ type: 'SET', payload: `anecdote '${content}' created` })
    setTimeout(() => {
      dispatchNotification({ type: 'CLEAR' })
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
