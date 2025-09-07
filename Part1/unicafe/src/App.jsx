import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  return (
    <div>
      <p>Good {props.good}</p>
      <p>Neutral {props.neutral}</p>
      <p>Bad {props.bad}</p>
      <p>All {props.total}</p>
      <p>Average {props.average}</p>
      <p>Positive {props.goodPercent}%</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + bad + neutral
  const average = total ? (good * 1 + bad * -1 + neutral * 0) / total : 0
  const goodPercent = total ? (good / total * 100).toFixed(2) : 0

  const handleClick = (feedback) => {
    if (feedback === "good") setGood(good + 1)
    if (feedback === "neutral") setNeutral(neutral + 1)
    if (feedback === "bad") setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <br />
      <Button onClick={() => handleClick("good")} text="Good" />
      <Button onClick={() => handleClick("neutral")} text="Neutral" />
      <Button onClick={() => handleClick("bad")} text="Bad" />
      <br />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} goodPercent={goodPercent} />
    </div>
  )
}


export default App;