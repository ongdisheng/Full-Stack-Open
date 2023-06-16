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
const Total = (props) => {
  // compute total exercises
  const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises

  return (
    <>
      <p>
        Number of exercises {total}
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
      }
    ]
  }

  return <Course course={course} />
}

export default App