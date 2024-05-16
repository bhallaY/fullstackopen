/* eslint-disable react/prop-types */
import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)
  const calculateNextRandomAnecdote = () => {
    return setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  const incrementVote = () => {
    const incrementedVotes = [...votes]
    incrementedVotes[selected] += 1
    if (incrementedVotes[selected] > incrementedVotes[mostVoted]) {
      setMostVoted(selected)
    }
    return setVotes(incrementedVotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={incrementVote} text='vote' />
      <Button onClick={calculateNextRandomAnecdote} text='next anecdote' />
      <h2>Anecdote with most votes</h2>
      <Anecdote anecdote={anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </div>
  )
}

const Anecdote = ({ anecdote, votes }) => {
  return (
    <p> {anecdote} <br />
      has {votes} votes</p>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

export default App