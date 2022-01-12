import React from 'react'
import "./Box.css"

function Box({icon,day,temperature}) {

  return (
    <div className="box">
      <img src={icon} alt="" className="icon" />
      <div className='next'> 
        <h3 className="day">{day}</h3>
        <h4 className="temp">{temperature}°C</h4>
      </div>
    </div>
  )
}

export default Box;