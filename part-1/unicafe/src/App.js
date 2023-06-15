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
    </div>
  )
}

export default App