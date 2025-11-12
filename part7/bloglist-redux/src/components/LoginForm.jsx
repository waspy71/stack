

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedBlogappUser = window.localStorage.getItem('loggedBlogappUser')
    if(loggedBlogappUser) {
      const user = JSON.parse(loggedBlogappUser)
      setUser(user)
    }
  }, [setUser])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      dispatch(setNotification(
        'Successfully logged in',
        'info'
      ))
      setUsername('')
      setPassword('')
    } catch (err){
      dispatch(setNotification(err.response.data.error))
      setUsername('')
      setPassword('')
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm