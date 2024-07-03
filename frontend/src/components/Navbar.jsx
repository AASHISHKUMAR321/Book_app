import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <div style={{display:'flex',gap:"5px"}} >
      <Link to={'/'} >Home</Link>
      <Link to={'/register'} >Register</Link>
      <Link to={'/login'} >Login</Link>
    </div>
  )
}

export default Navbar