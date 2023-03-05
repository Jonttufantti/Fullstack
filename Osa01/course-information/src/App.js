let App = () => {

  let course = 'Half Stack application development'
  let part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  
  let part2 = {
    name: 'Using props to pass data',
    exercises: 7
  } 

  let part3 = {
    name: 'State of a component',
    exercises: 14
  }

  let Header = () => {
    return <p>{course}</p>
  }

  let Content = () => {
    return (
    <div>
    {part1.name} {part1.exercises}<br></br>
    {part2.name} {part2.exercises}<br></br>
    {part3.name} {part3.exercises}
    </div>
    );
  }

  let Total = () => {
    return <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
  }
  


  return (
    <div>
      <Header/>
      <Content/>
      <Total/>
    </div>
  );
}

export default App