
function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 },
    ],
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map(p => p.exercises)} />
    </div>
  )
}

const Part = (props) => {
  return <p>{props.part.name}  {props.part.exercises}</p>
}

const Header = (props) => <h1>{props.course}</h1>
const Content = (props) => {
  return props.parts.map((part) => <Part key={part.name} part={part} />)
}
const Total = (props) => {
  const total = props.exercises.reduce(
    (acc, currVal) => acc + currVal,
    0
  )

  return <p>Number of exercises {total}</p>
}

export default App
