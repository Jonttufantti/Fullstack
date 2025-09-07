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
  const total = good+bad+neutral
  const average = total ? (good*1+bad*-1+neutral*0)/total : 0
  const goodPercent = total ? (good/total*100).toFixed(2) : 0

  const handleClick = (feedback) => {
    if (feedback==="good") setGood(good+1)
    if (feedback==="neutral") setNeutral(neutral+1)
    if (feedback==="bad") setBad(bad+1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <br />
      <Button onClick={()=>handleClick("good")} text="Good" />
      <Button onClick={()=>handleClick("neutral")} text="Neutral" />
      <Button onClick={()=>handleClick("bad")} text="Bad" />
      <br />
      <h1>Statistics</h1>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {total}</p>
      <p>Average {average}</p>
      <p>Positive {goodPercent}%</p>
    </div>
  )
}


export default App;