import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodclick = () => {
    const newGood = good + 1;
    setGood(newGood);
    console.log(newGood);
  };

  const handleNeutralclick = () => {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
    console.log(newNeutral);
  };

  const handleBadclick = () => {
    const newBad = bad + 1;
    setBad(newBad);
    console.log(newBad);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <br />
      <Button onClick={handleGoodclick} text="Good" />
      <Button onClick={handleNeutralclick} text="Neutral" />
      <Button onClick={handleBadclick} text="Bad" />
      <br />
      <h1>Statistics</h1>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
    </div>
  )
}


export default App;