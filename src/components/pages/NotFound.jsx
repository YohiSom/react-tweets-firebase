import React from 'react'
import {Link} from 'react-router-dom'

function NotFound() {
const style = {
    color: "#FFFFFF"
}

  return (
    <div className='bad-routing' style={style}>
        <h2>Sorry</h2>
        <p>This page cannot be found</p>
        <Link to='/'>Click to go to navigate to homepage</Link>
    </div>
  )
}

export default NotFound