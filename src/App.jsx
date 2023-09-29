import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './home'
import Register from './register'
import Login from './login'
import Todo from './todo'

function App() {
const [count, setCount] = useState(0)

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/todo-page' element={<Todo/>}/>
          <Route path='*' element={<p>Page not found</p>}/>

        </Routes>
      </Router>
    </div>
  )
}

export default App
