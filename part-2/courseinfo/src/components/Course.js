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

export default Course