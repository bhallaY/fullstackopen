const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Part = ({ name, exercises }) => {
  return <p>{name} {exercises}</p>
}

const Content = ({ parts }) => {
  return (
    parts.map((pE) => <Part key={pE.name} name={pE.name} exercises={pE.exercises} />)
  )
}

const Total = ({ exercises }) => {
  return <p>Number of exercises {exercises.reduce((acc, currVal) => acc + currVal, 0)}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 },
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total exercises={parts.map((part) => part.exercises)} />
    </div>
  )
}

export default App