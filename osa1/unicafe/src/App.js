import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value, text2}) => {
  return (
          <tr>
            <td>{text}</td>
            <td>{value} {text2}</td>
          </tr>
  )
}

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad > 0) {
  return (
  <div>
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good}/>
        <StatisticLine text="neutral" value={props.neutral}/>
        <StatisticLine text="bad" value={props.bad}/>
        <StatisticLine text="all" value={props.good + props.neutral + props.bad}/>
        <StatisticLine text="average" value={(props.good - props.bad) / (props.good + props.neutral + props.bad)}/>
        <StatisticLine text="positive" value={(props.good / (props.good + props.neutral + props.bad)) * 100} text2="%"/> 
      </tbody>
    </table>
    
  </div>
  )
}
return (
  <div>
    <p>No feedback given</p>
  </div>
)
}

const App = (props) => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <h1>statistics</h1> 
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
