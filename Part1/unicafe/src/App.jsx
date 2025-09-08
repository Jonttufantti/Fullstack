import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return <p>No feedback given</p>
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text="Good" value={props.good} />
          <StatisticLine text="Neutral" value={props.neutral} />
          <StatisticLine text="Bad" value={props.bad} />
          <StatisticLine text="Total" value={props.total} />
          <StatisticLine text="Average" value={props.average} />
          <StatisticLine text="Positive" value={`${props.goodPercent}%`} />
        </tbody>
      </table>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + bad + neutral
  const average = (good * 1 + bad * -1 + neutral * 0) / total
  const goodPercent = (good / total * 100).toFixed(2)

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