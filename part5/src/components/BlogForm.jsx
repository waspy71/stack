
import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const clearFields = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const responseBlog = await blogService.create({
        title,
        author,
        url
      })

      setBlogs(blogs.concat(responseBlog))
      clearFields()
    } catch {
      console.log('ERROR')
      clearFields()
    }

  }

  return (
    <div>
      <h2>Create blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            title
          </label>
          <input
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label>
            author
          </label>
          <input
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label>
            url
          </label>
          <input
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm