
import { useState } from 'react'

export const Button = ({ text, onClick }) =><button onClick={onClick}>{text}</button> 

export const Statiscics = ({ good, neutral, bad, total }) => {
  return (
    <div>
      <h2>Statiscics</h2>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>total: {total}</p>
      <p>average: {total ? (good - bad) / total : '0'}</p>
      <p>positive: {total ? (good /total * 100) : '0'} %</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGood = () => {
    const newGood = good + 1
    setGood(newGood)
    setTotal(newGood + neutral + bad)
  }

  const handleNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
    setTotal(good + newNeutral + bad)
  }

  const handleBad = () => {
    const newBad = bad + 1
    setBad(newBad)
    setTotal(good + neutral + newBad)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text={'good'} onClick={handleGood} />
      <Button text={'neutral'} onClick={handleNeutral} />
      <Button text={'bad'} onClick={handleBad} />
      <Statiscics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

export default App