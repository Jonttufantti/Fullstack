
const App = () => {
  function Header (props) {
    return (
      props.course
    );
  }
  function Content () {
    return (
    <div>
        <Content part1={'Fundamentals of React'} exercises1={10}/>
        <Content part2={'Using props to pass data'} exercises2={7}/>
        <Content part3={'State of a component'} exercises3={14}/>
    </div>
    );
  }
  function Total (props) {
    return (
    <div>
        Number of exercises {props.number1+props.number2+props.number3}
    </div>
    );
  }


  return (
      <div>
        <Header course={'Half Stack application development'}/>
        <Content/>
        <Total number1={10} number2={7} number3={14}/>
      </div>
  );
}

export default App;
