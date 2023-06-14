// header component
const Header = (props) => (
  <>
    <h1>{props.course}</h1>
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
const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>
  )
}

// total component
const Total = (props) => {
  return (
    <>
      <p>
        Number of exercises {props.sum}
      </p>
    </>
  )
}

// app component
const App = () => {
  // const-definitions
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total sum={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
  )
}

export default App