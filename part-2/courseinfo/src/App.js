// header component
const Header = (props) => (
  <>
    <h1>{props.name}</h1>
  </>
)

// part component
const Part = (props) => {
  return (
    <>
      <p>
        {props.name} {props.exercises}
      </p>
    </>
  )
}

// content component
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} 
              name={part.name} 
              exercises={part.exercises} 
        />
      )}
    </div>
  )
}

// total component
const Total = ({ parts }) => {
  // compute total exercises
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <>
      <p>
        <strong>total of {total} exercises</strong>
      </p>
    </>
  )
}

// course component
const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

// app component
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App