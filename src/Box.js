import React from 'react'
import "./Box.css"

function Box({icon,day,temperature}) {
  // const icon="//cdn.weatherapi.com/weather/64x64/night/143.png";
  // const day="Monday";
  // const temperature=32;
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