
import { useSelector, useDispatch } from "react-redux"
import { anecdotesVote } from "../reducers/anecdoteReducer"
import { setNotification, clearNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()


 const anecdotes = useSelector(({ anecdotes, filter }) => {
  return filter === ''
    ? anecdotes
    : anecdotes.filter(a => a.content.toLowerCase().includes(filter))
 })

  const vote = (id) => {
    dispatch(anecdotesVote(id))
    dispatch(setNotification(`Anecdote liked`))
    setTimeout(() => {
      dispatch(clearNotification(null))
    }, 5000)
  }

  return (
    <div>
      {anecdotes.toSorted((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList