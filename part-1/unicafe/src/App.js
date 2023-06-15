import { useState } from 'react'

// title component
const Title = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

// button component
const Button = (props) => {
  // destructuring 
  const { handleClick, text } = props

  return (
    <button onClick={handleClick}>{text}</button>
  )
}

// app component 
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // define total clicks
  const total = good + neutral + bad

  return (
    <div>
      <Title text='give feedback' />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' /> 
      <Title text='statistics' />
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {(good + bad * -1) / total}</p>
      <p>positive {good / total * 100} %</p>
    </div>
  )
}

export default App