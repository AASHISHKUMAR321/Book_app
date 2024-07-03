import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Register from './Register'
import { Login } from './Login'
export const MainRoute = () => {
  return (
    <Routes>
        <Route element={<Register/>} path='/register'  />
        <Route element={<Login/>} path='/Login'  />
    </Routes>
  )
}

export default MainRoute
