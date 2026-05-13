import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export function getWeatherInfo(capital, countryCode) {
  const req = axios.get(
    `${BASE_URL}/weather?q=${capital},${countryCode}&appid=${API_KEY}`,
  );

  return req
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });
}

export function getWeatherIconUrl(icon) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
