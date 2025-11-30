

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { logUser, setUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const loggedBlogappUser = window.localStorage.getItem('loggedBlogappUser')
    if(loggedBlogappUser) {
      const user = JSON.parse(loggedBlogappUser)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(logUser({ username, password }))

    setUsername('')
    setPassword('')
    navigate('/')
  }

  return (
    <Form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <Form.Group className='w-25'>
        <Form.Label>Username</Form.Label>
        <Form.Control type='text' value={username} onChange={({ target }) => setUsername(target.value)} />
        <Form.Label>Password</Form.Label>
        <Form.Control type='text' value={password} onChange={({ target }) => setPassword(target.value)} />
        <Button className='my-2' variant='primary' type='submit'>login</Button>
      </Form.Group>
    </Form>
  )
}

export default LoginForm