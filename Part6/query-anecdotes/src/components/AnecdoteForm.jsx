import { createAnecdote } from '../requests'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const [_, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']) || []
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notificationDispatch({ type: "CREATED", payload: newAnecdote.content })
      setTimeout(() => notificationDispatch({ type: "CLEAR" }), 5000)
    },
    onError: (error) => {
      notificationDispatch({
        type: "ERROR",
        payload: error.response?.data || 'Failed to create anecdote'
      })
      setTimeout(() => notificationDispatch({ type: "CLEAR" }), 5000)
    }

  })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
