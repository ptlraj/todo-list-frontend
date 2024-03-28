import { useState } from 'react'
import './App.css'
import List from './component/List'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      </div>
      <List />
    </>
  )
}

export default App
