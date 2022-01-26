import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import Box from "./Box";
import { day, dayIndex, days, getCoords} from "./util";

function App() {
  const [currentLocation, setCurrentLocation] = useState("")
  const [data, setData] = useState({
    city: "",
    country: "",
    temperature: 0,
    humidity: 0,
    windSpeed: 0,
    windDirection: "",
    condition: {
      type: "",
      icon: "",
    },
  });
  const [forecast, setForecast] = useState([]);
  const [input,setInput]=useState("")

  useEffect(() => {
    async function fetchdata() {
      const {lat,long} = await getCoords();
      const search=currentLocation===""?lat+","+long : currentLocation
      const _url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_KEY}&q=${search}&days=3&aqi=no&alerts=no`;
      const response = await axios.get(_url);
      const data = response.data;
      const { temp_c, humidity, wind_mph, wind_dir, condition } = data.current;
      const { name, country } = data.location;
      const _forecast = data.forecast.forecastday;
      setData({
        city: name,
        country: country,
        temperature: temp_c,
        humidity: humidity,
        windSpeed: wind_mph,
        windDirection: wind_dir,
        condition: {
          type: condition.text,
          icon: condition.icon,
        },
      });
      setForecast([])
      for (let i = 0; i < 3; i++) {
        setForecast((prevState) => [
          ...prevState,
          {
            icon: _forecast[i].day.condition.icon,
            temperature: _forecast[i].day.avgtemp_c,
            day: day[i],
          },
        ]);
      }
      // console.log(forecast);
    }
    fetchdata();
  }, [currentLocation]);

  const handleEnter= async (event)=>{
    if (event.key==="Enter"){
      const url=`https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_KEY}&q=${input}`
      try{
        const response= await axios.get(url);
        const name= response.data.location.name;
        setCurrentLocation(name);
      }catch(err){
        console.log(err.response)
        setCurrentLocation("")
      }
    }
  }
  return (
    <div className="body">
      <div className="search">
        <input type="text" className="input" placeholder="Enter city name" value={input} onChange={e=> setInput(e.target.value)} onKeyPress={handleEnter} />
      </div>
      <div className="container">
        <h2 id="currentTemperature">{data.temperature} °C</h2>
        <img id="icon" src={data.condition.icon} alt="" />
        <div className="today">
          <h3 id="location">
            {data.city},{data.country}
          </h3>
          <h4 id="day">{day[0]}</h4>
          <h4 id="humidity">humidity: {data.humidity}%</h4>
          <h4 id="wind">
            Wind: {data.windDirection}, {data.windSpeed} mph
          </h4>
        </div>
      </div>
      <div className="container-2">
        {forecast.map((data,index) => (
          <Box
            key={index}
            day={data.day}
            icon={data.icon}
            temperature={data.temperature}
          />
        ))}
        <Box day={days[(dayIndex+3)%7]} icon={"//cdn.weatherapi.com/weather/64x64/day/113.png"} temperature={15}/>
        <Box day={days[(dayIndex+4)%7]} icon={"//cdn.weatherapi.com/weather/64x64/day/113.png"} temperature={15.2}/>

      </div>
    </div>
  );
}

export default App;
