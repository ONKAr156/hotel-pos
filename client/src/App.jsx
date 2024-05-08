import React from 'react'
import Login from './waiter/Login'
import Dashboard1 from './waiter/Dashboard1'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard2 } from './waiter/[id]/Dashboard2'


const App = () => {
  return < >
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard1 />} />
        <Route path='/table/:id' element={<Dashboard2 />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App