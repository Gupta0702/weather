import axios from "axios";

const days=[
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]

const date= new Date();
let dayIndex=date.getDay();

const day=[days[dayIndex],days[(dayIndex+1)%7],days[(dayIndex+2)%7]]

const getCoordinates=()=>{
  let coordinates;
  navigator.geolocation.getCurrentPosition(position=>{
    const {latitude,longitude}=position.coords
    coordinates=[latitude.toString(),longitude.toString()];
  })
  return coordinates
}


const getCity = async ()=>{
  const coordinates=await getCoordinates()
  const lat=coordinates[0];
  const long=coordinates[1];
  const url=`https://us1.locationiq.com/v1/reverse.php?key=${REACT_APP_LOCATION_KEY}&lat=${lat}&lon=${long}&format=json`;
  const response= await axios.get(url);
  const city= response.address.suburb
  return city
}


export  {day,getCity};

