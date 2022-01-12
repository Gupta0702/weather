import axios from 'axios'
import React, { useState,useEffect } from 'react'
import "./App.css"
import Box from './Box'
import {day,getCity} from "./util"

function App() {
  // const [currentLocation, setCurrentLocation] = useState()
  const [data,setData]=useState({
    city:"",
    country:"",
    temperature:0,
    humidity:0,
    windSpeed:0,
    windDirection:"",
    condition:{
      type:"",
      icon:""
    }
  })
  const [forecast,setForecast]=useState([
    {
      icon:"",
      temperature:0,
      day:"Monday"
    }
  ])

  useEffect(() => {
    async function fetchdata(){
      const city= await getCity()
      const _url=`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_KEY}&q=${city}&days=3&aqi=no&alerts=no`
      const response= await axios.get(_url)
      const data=response.data
      const {temp_c,humidity,wind_mph,wind_dir,condition}=data.current
      const {name,country}=data.location
      const _forecast=data.forecast.forecastday;
      setData({
        city:name,
        country:country,
        temperature:temp_c,
        humidity:humidity,
        windSpeed:wind_mph,
        windDirection:wind_dir,
        condition:{
          type:condition.text,
          icon:condition.icon
        }
      })
      setForecast([
        {
          icon:"",
          temperature:0,
          day:"Monday"
        }
      ]);
      for(let i=0;i<3;i++){
        setForecast(prevState=>[
          ...prevState,
          {
            icon:_forecast[i].day.condition.icon,
            temperature:_forecast[i].day.avgtemp_c,
            day: day[i]
          }
        ])
      }
      console.log(forecast);
    }
    fetchdata();
  }, [])

  return (
    <div>
      <div className="search">
        <input type="text" className='input' placeholder='Enter city name'/>
      </div>
      <div className="container">
        <h2 id="currentTemperature">{data.temperature} °C</h2>
        <img id="icon" src={data.condition.icon} alt="" />
        <div className="today">
          <h3 id="location">{data.city},{data.country}</h3>
          <h4 id="day">{day[0]}</h4>
          <h4 id="humidity">humidity: {data.humidity}%</h4>
          <h4 id="wind">Wind: {data.windDirection}, {data.windSpeed} mph</h4>
        </div>
      </div>
      <div className='container-2'>
        {forecast.map(data=>{
          <Box key="" day={data.day} icon={data.icon} temperature={data.temperature} />
        })}

        {/* <Box day={forecast[0].day} icon={forecast[0].icon} temperature={forecast[0].temperature}/>
        <Box day={forecast[0].day} icon={forecast[0].icon} temperature={forecast[0].temperature}/>
        <Box day={forecast[0].day} icon={forecast[0].icon} temperature={forecast[0].temperature}/>
        <Box day={forecast[0].day} icon={forecast[0].icon} temperature={forecast[0].temperature}/>
        <Box day={forecast[0].day} icon={forecast[0].icon} temperature={forecast[0].temperature}/>  */}

      </div>
    </div>
  )
};

export default App;
