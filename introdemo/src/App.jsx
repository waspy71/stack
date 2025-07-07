import { useState } from "react"

const Hello = ({ name, age }) => {  
  console.log(name, age)
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

const App = () => {
  const [counter, setCouter] = useState(0)

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
    </>
  )
}

export default App