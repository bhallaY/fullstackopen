const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Part = ({ partName, exercises }) => {
  return <p>{partName} {exercises}</p>
}

const Content = ({ partWithExercise }) => {
  return (
    partWithExercise.map((pE) => <Part key={pE.part} partName={pE.part} exercises={pE.exercise} />)
  )
}

const Total = ({ exercises }) => {
  return <p>Number of exercises {exercises.reduce((acc, currVal) => acc + currVal, 0)}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const partWithExercise = [
    { part: 'Fundamentals of React', exercise: 10 },
    { part: 'Using props to pass data', exercise: 7 },
    { part: 'State of a component', exercise: 14 },
  ]

  return (
    <div>
      <Header course={course} />
      <Content partWithExercise={partWithExercise} />
      <Total exercises={partWithExercise.map((partWithExercise) => partWithExercise.exercise)} />
    </div>
  )
}

export default App