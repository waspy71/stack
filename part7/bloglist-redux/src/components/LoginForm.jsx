

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { logUser, setUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

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
    <Container className='vh-100 d-flex align-items-center justify-content-center'>
      <Row className='w-100 justify-content-center'>
        <Col xs={12} md={6} lg={3}>
          <Form onSubmit={handleLogin}>
            <Form.Group>
              <h2 className='text-center'>Log in to application</h2>
              <Form.Label>Username</Form.Label>
              <Form.Control type='text' value={username} onChange={({ target }) => setUsername(target.value)} />
              <Form.Label>Password</Form.Label>
              <Form.Control type='text' value={password} onChange={({ target }) => setPassword(target.value)} />
              <Button className='my-2' variant='primary' type='submit'>login</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginForm