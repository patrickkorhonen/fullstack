const Header = ({course}) => {
    return (
      <div>
        <h1>{course.name}</h1>
      </div>
    )
  }

  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(course =>
            <Part key={course.id} part={course.name} exercies={course.exercises}/>
        )}
      </div>
    )
  }

  const Total = ({ course }) => {
    const totalSumArray = course.parts.map(course => course.exercises)
    const totalSum = totalSumArray.reduce((partialSum, a) => partialSum + a, 0)
    return (
      <div>
        <p>Total of {totalSum} exercises</p>
      </div>
    )
  }

  const Course = ({course}) => {
    return (
      <div>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
      </div>
    )
  }

  const Part = (props) => {
    return (
      <div>
        <p>{props.part} {props.exercies}</p>
      </div>
    )
  }

export default Course