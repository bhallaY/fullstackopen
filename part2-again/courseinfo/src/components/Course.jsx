const Course = ({ course }) => {
    // could split this into a map -> exercises, then reduce. but this works too and in 1 pass not 2 
    const total = course.parts.reduce((acc, curr) => acc + curr.exercises, 0)
    return (
        <>
            <CourseHeader course={course.name} />
            <Content parts={course.parts} />
            <Total total={total} />
        </>
    )
}

const CourseHeader = (props) => <h2>{props.course}</h2>

const Content = (props) => (
    <div>
        {props.parts.map(part => <Part key={part.id} part={part} />)}
    </div>
)

const Part = (props) => (
    <p>
        {props.part.name} {props.part.exercises}
    </p>
)

const Total = (props) => <b>total of {props.total} exercises</b>

export default Course