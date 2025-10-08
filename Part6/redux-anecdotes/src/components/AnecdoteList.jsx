import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const handleVote = (id) => {
    dispatch(voteAnecdote(id))
  }

  const filteredAnecdotes = [...anecdotes]
    .filter(a =>
      filter === 'ALL' ? true : a.content.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {filteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
