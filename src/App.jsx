import { useState, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Home from './home'
import Register from './register'
import Login from './login'
import Todo from './todo'
import { AuthContext } from './context/Authcontext'

function App() {
const [count, setCount] = useState(0)

const {currentUser} = useContext(AuthContext)

const RequireAuth =({children}) => {
  return currentUser ? (children) : <Navigate to="/login"/>
}

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<RequireAuth><Home/></RequireAuth>}/>
          <Route path='/signup' element={<Register/>}/>
          <Route path='/todo-page' element={<RequireAuth><Todo/></RequireAuth>}/>
          <Route path='*' element={<p>Page not found</p>}/>

        </Routes>
      </Router>
    </div>
  )
}

export default App
