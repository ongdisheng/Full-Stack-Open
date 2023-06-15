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

// statistic line component 
const StatisticLine = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  )
}

// statistics component 
const Statistics = ({ stats }) => {
  // conditional rendering
  if (stats.total === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  // display statistics only once feedback has been gathered
  return (
    <table>
      <StatisticLine text='good' value={stats.good} />
      <StatisticLine text='neutral' value={stats.neutral} />
      <StatisticLine text='bad' value={stats.bad} />
      <StatisticLine text='all' value={stats.total} />
      <StatisticLine text='average' value={stats.average} />
      <StatisticLine text='positive' value={`${stats.positive} %`} />
    </table>
  )
}

// app component 
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // define advanced stats
  const total = good + neutral + bad
  const average = (good + bad * -1) / total
  const positive = good / total * 100

  // define stats object
  const stats = {
    good,
    neutral,
    bad,
    total,
    average,
    positive
  }

  return (
    <div>
      <Title text='give feedback' />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' /> 
      <Title text='statistics' />
      <Statistics stats={stats} />
    </div>
  )
}

export default App