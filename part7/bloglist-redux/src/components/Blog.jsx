import { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, user, handleLikes, handleDelete }) => {
  const [visible, setVisible] = useState(true)

  const canRemove = user.username === blog.user.username

  const toggleVisibiliy = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      {visible
        ? (
          <div>
            <Link to={`/blogs/${blog.id}`} >
              {blog.title} - {blog.author}
            </Link>
            <button onClick={toggleVisibiliy}>view</button>
          </div>)
        : (
          <div>
            <div>
              <Link to={`/blogs/${blog.id}`} >
                {blog.title} - {blog.author}
              </Link>
              <button onClick={toggleVisibiliy}>hide</button>
            </div>
            <div>
              <a href={`https://${blog.url}`}>{blog.url}</a>
            </div>
            <div>
              likes {blog.likes} <button onClick={() => handleLikes(blog)}>like</button>
            </div>
            <div>
              {blog.user.name}
            </div>
            {canRemove && <button onClick={() => handleDelete(blog)}>delete</button>}
          </div>)
      }
    </div>
  )}

export default Blog