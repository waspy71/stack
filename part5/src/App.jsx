import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser('')
  }

  return (
    <div>
      {!user && <LoginForm setUser={setUser} />}
      {user && (
        <div>
          <p>
            {user.name} logged in
            <button onClick={() => handleLogOut()}>logout</button>
          </p>
          <BlogList blogs={blogs} />
        </div>
      )}
    </div>
  )
}

export default App