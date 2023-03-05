let App = () => {
  let course = {
    name: 'Half Stack application development',
    parts: [
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
  }
  let Header = () => {
      return <p>{course.name}</p>
    }

  let Content = () => {
      return (
        <div>
          {course.parts[0].name} {course.parts[0].exercises}<br></br>
          {course.parts[1].name} {course.parts[1].exercises}<br></br>
          {course.parts[2].name} {course.parts[2].exercises}
        </div>
      );
    }

  let Total = () => {
      return <p>Number of exercises {course.parts[0].exercises+course.parts[1].exercises+course.parts[2].exercises}</p>
    }



  return(
    <div>
      <Header/>
      <Content/>
      <Total/>
    </div >
  );
}

export default App