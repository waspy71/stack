import { useState } from "react"

const Hello = ({ name, age }) => {  
  const bornYear = () => new Date().getFullYear()- age

  return (    
    <div>      
      <p>Hello {name}, you are {age} years old</p>    
      <p>So you were probably born in {bornYear()}</p>
    </div>  
  )
}

const Display = ({ counter }) => {
  return (
    <div>{counter}</div>
  )
}

const Button = ({ text,onClick }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const History = ({ allClicks, total}) => {
  if (allClicks.length === 0) {
    return (
      <div>app is used by pressing the buttons</div>
    )
  }

  return (
    <div>
      <p>button press history: {allClicks.join(' ')}</p>
      <p>total is {total}</p>
    </div>
    
  )
}

const App = () => {
  const [counter, setCouter] = useState(0)

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(left + 1)
    setTotal(updatedLeft + right)
  }

  const handleRighClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(right + 1)
    setTotal(left + updatedRight)
  }

  const name = 'Peter'
  const age = 10

  const increaseByOne = () => setCouter(counter + 1)
  const decreaseByOne = () => setCouter(counter - 1)
  const setToZero = () => setCouter(0)


  return (
    <>
      <p>Hello world</p>
      <Hello name='Maya' age={26 + 10}/>
      <Hello name={name} age={age}/>
      <Display counter={counter} />
      <Button text='plus' onClick={increaseByOne}/>
      <Button text='zero' onClick={setToZero}/>
      <Button text='minus' onClick={decreaseByOne}/>
      <br></br>
      <hr></hr>
      {left}
      <Button text='left' onClick={handleLeftClick} />
      <Button text='right' onClick={handleRighClick} />
      {right}
      <History allClicks={allClicks} total={total} />

    </>
  )
}

export default App