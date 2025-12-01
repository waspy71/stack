
import { useState, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'

const Togglable = ( props ) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibiliy = () => {
    setVisible(!visible)
  }

  useImperativeHandle(props.ref, () => {
    return { toggleVisibiliy }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button className='my-2' variant='primary' onClick={toggleVisibiliy}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button className='my-2' variant='primary' onClick={toggleVisibiliy}>cancel</Button>
      </div>
    </div>
  )

}

export default Togglable