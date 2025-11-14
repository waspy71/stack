import './index.css'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { likeBlog, removeBlog, setBackendBlogs } from './reducers/blogsReducer'


const App = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(setBackendBlogs())
  }, [dispatch])

  const handleLikes = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = async (blog) => {
    dispatch(removeBlog(blog))
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser('')
    dispatch(setNotification('Successfully logged out', 'info'))
  }

  return (
    <div>
      <Notification />
      {!user && <LoginForm setUser={setUser} />}
      {user && (
        <div>
          <p>
            {user.name} logged in
            <button onClick={() => handleLogOut()}>logout</button>
          </p>
          <Togglable buttonLabel='create new blog' ref={blogFormRef} >
            <BlogForm
              blogFormRef={blogFormRef}
            />
          </Togglable>
          <BlogList
            blogs={blogs}
            user={user}
            handleLikes={handleLikes}
            handleDelete={handleDelete}
          />
        </div>
      )}
    </div>
  )
}

export default App