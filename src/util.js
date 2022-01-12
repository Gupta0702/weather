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
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(resolve, reject,options);
  });
  return {
    long: pos.coords.longitude.toString(),
    lat: pos.coords.latitude.toString(),
  };
};

export { day, getCoords ,dayIndex,days};
