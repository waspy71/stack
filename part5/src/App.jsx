import './index.css'
import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [info, setInfo] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const notifyWith = (text, type='error') => {
    setInfo({ text, type })
    setTimeout(() => {
      setInfo(null)
    }, 5000)
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser('')
    notifyWith('Successfully logged out', 'info')
  }

  return (
    <div>
      <Notification info={info} />
      {!user && <LoginForm setUser={setUser} notifyWith={notifyWith} />}
      {user && (
        <div>
          <p>
            {user.name} logged in
            <button onClick={() => handleLogOut()}>logout</button>
          </p>
          <BlogForm blogs={blogs} setBlogs={setBlogs} notifyWith={notifyWith} />
          <BlogList blogs={blogs} />
        </div>
      )}
    </div>
  )
}

export default App