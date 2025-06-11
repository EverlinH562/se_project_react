import { handleServerResponse } from "./api";

export const getWeather = (coordinates, APIkey) => {
  const { lat, lon } = coordinates;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`;
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`Weather API error: ${res.status}`);
    }
    return res.json();
  });
};

export const filterWeatherData = (data) => {
    const result = {};
    result.city = data.name;
    result.temp = {F: Math.round(data.main.temp), C: Math.round(((data.main.temp - 32)*5) / 9) };
    result.type = getWeatherType(result.temp.F);
    result.condition = data.weather[0].main.toLowerCase();
    result.isDay = isDay(data.sys, Date.now());
    return result;
};

const isDay = ({sunrise, sunset}, now) => {
    return sunrise *1000 < now && now < sunset * 1000;

};

const getWeatherType = (temperature) => {
    if (temperature > 86) {
        return 'hot';
      } else if (temperature >= 66 && temperature < 86) {
        return 'warm';
      } else {
        return 'cold';
      }
}

