import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import { useNavigate } from 'react-router-dom'
import { Form, Button, InputGroup } from 'react-bootstrap'

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const clearFields = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url,
    }

    dispatch(addBlog(newBlog))
    blogFormRef.current.toggleVisibiliy()
    clearFields()
    navigate('/')
  }

  return (
    <div>
      <h2>Create blog</h2>
      {/* <form onSubmit={handleSubmit}>
        <div>
          <label>
            title
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form> */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className='w-25'>
          <Form.Label>title:</Form.Label>
          <Form.Control type='text' value={title} onChange={({ target }) => setTitle(target.value)} />
          <Form.Label>author:</Form.Label>
          <Form.Control type='text' value={author} onChange={({ target }) => setAuthor(target.value)} />
          <Form.Label>url:</Form.Label>
          <Form.Control type='text' value={url} onChange={({ target }) => setUrl(target.value)} />
          <Button className='my-2' variant='primary' type='submit'>create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm
