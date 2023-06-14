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
        {props.part} {props.exercises}
      </p>
    </>
  )
}

// content component
const Content = (props) => {
  return (
    <div>
      <Part part={props.part[0]} exercises={props.exercises[0]} />
      <Part part={props.part[1]} exercises={props.exercises[1]} />
      <Part part={props.part[2]} exercises={props.exercises[2]} />
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]} />
      <Total sum={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App