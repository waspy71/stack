import { useState } from 'react'



const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(true)

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
    <div style={blogStyle}>
      {visible
        ? (
          <div>
            {blog.title} - {blog.author} <button onClick={toggleVisibiliy}>view</button>
          </div>)
        : (
          <div>
            <div>
              {blog.title} - {blog.author} <button onClick={toggleVisibiliy}>hide</button>
            </div>
            <div>
              {blog.url}
            </div>
            <div>
              likes {blog.likes} <button>like</button>
            </div>
            <div>
              {blog.user.name}
            </div>
          </div>)
      }
    </div>
  )}

export default Blog