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

  const calculateAverageScore = () => {
    return ((good * 1) + (neutral * 0) + (bad * -1)) / (good + neutral + bad)
  }

  const caluclatePercentPositive = () => {
    return (good / (good + neutral + bad)) * 100
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={incrementGood} text='good' />
      <Button onClick={incrementNeutral} text='neutral' />
      <Button onClick={incrementBad} text='bad' />
      <h2>statistics</h2>
      <Statistic name='good' number={good} />
      <Statistic name='neutral' number={neutral} />
      <Statistic name='bad' number={bad} />
      <Statistic name='all' number={good + neutral + bad} />
      <Statistic name='average' number={calculateAverageScore()} />
      <Statistic name='positive' number={caluclatePercentPositive()} />
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistic = ({ name, number }) => {
  return (
    <p>{name} {number}</p>
  )
}

export default App
