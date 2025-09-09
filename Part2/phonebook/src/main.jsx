import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "0000000"
  },
]

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App persons={persons}/>
  </StrictMode>,
)
