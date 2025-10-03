
import { useDispatch } from "react-redux"
import { anecdotesCreate } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const anecdoteSubmit = (e) => {
      e.preventDefault()
      const content = e.target.content.value
      e.target.content.value = ''
      dispatch(anecdotesCreate(content))
    }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={anecdoteSubmit}>
        <div>
          <input name='content' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm