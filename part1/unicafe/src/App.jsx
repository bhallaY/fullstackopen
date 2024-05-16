/* eslint-disable react/prop-types */
import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={incrementGood} text='good' />
      <Button onClick={incrementNeutral} text='neutral' />
      <Button onClick={incrementBad} text='bad' />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  const calculateAverageScore = () => {
    return ((good * 1) + (neutral * 0) + (bad * -1)) / (good + neutral + bad)
  }

  const caluclatePercentPositive = () => {
    return (good / (good + neutral + bad)) * 100
  }

  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine name='good' statistic={good} />
          <StatisticLine name='neutral' statistic={neutral} />
          <StatisticLine name='bad' statistic={bad} />
          <StatisticLine name='all' statistic={good + neutral + bad} />
          <StatisticLine name='average' statistic={calculateAverageScore()} />
          <StatisticLine name='positive' statistic={caluclatePercentPositive()} />
        </tbody>
      </table>
    )
  }
}

const StatisticLine = ({ name, statistic }) => {
  return (
    <tr><td>{name} {statistic}</td></tr>
  )
}

export default App
