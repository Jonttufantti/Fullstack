import logo from './logo.svg';
import './App.css';

function Hello (props) {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}



function App() {  
  const name = 'kakka'
  const age = 10
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <h>Greetings</h>
          <Hello name='Joona' age={10+12}/>
          <Hello name={name} age={age}/>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
