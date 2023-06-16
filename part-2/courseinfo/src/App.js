// header component
const Header = (props) => (
  <>
    <h2>{props.name}</h2>
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course =>
        <Course key={course.id} 
                course={course} 
        />
      )}
    </div>
  )
}

export default App