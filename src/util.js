import axios from "axios";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const date = new Date();
let dayIndex = date.getDay();

const day = [
  days[dayIndex],
  days[(dayIndex + 1) % 7],
  days[(dayIndex + 2) % 7],
];

const getCoords = async () => {
  const pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  return {
    long: pos.coords.longitude,
    lat: pos.coords.latitude,
  };
};

const getCity = async () => {
  const coordinates = await getCoords();
  console.log(
    "🚀 ~ file: util.js ~ line 33 ~ getCity ~ coordinates",
    coordinates
  );
  const { lat, long } = coordinates;
  const url = `https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_LOCATION_KEY}&lat=${lat}&lon=${long}&format=json`;
  const response = await axios.get(url);
  const city = response.address.suburb;
  console.log("🚀 ~ file: util.js ~ line 43 ~ getCity ~ city", city);
  return city;
};

export { day, getCity };
