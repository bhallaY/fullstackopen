import { useState } from 'react'


// they just calculated statistics in the Statistics component. Its a bit simpler that way
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} feedback="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} feedback="neutral" />
      <Button handleClick={() => setBad(bad + 1)} feedback="bad" />
      <h2>statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  if ((good + bad + neutral) === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <StatisticLine value={good} text="good"></StatisticLine>
        <StatisticLine value={neutral} text="neutral" />
        <StatisticLine value={bad} text="bad" />
        <StatisticLine value={good + neutral + bad} text="all" />
        <StatisticLine value={calcAverage(good, neutral, bad)} text="average" />
        <StatisticLine value={calcPercentPositive(good, neutral, bad) + "%"} text="positive" />
      </tbody>
    </table>
  )
}

const calcAverage = (good, neutral, bad) => {
  const total = good + neutral + bad
  const numerator = good - bad
  return total === 0 ? 0 : numerator / total
}

const calcPercentPositive = (good, neutral, bad) => {
  const total = good + neutral + bad
  return total === 0 ? "0" : (good / total) * 100
}

const Button = ({ onClick, feedback }) => <button onClick={onClick}>{feedback}</button>
const StatisticLine = ({ value, text }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

export default App