import Image from 'next/image';
import React from 'react';

const FiveDayForecast = ({ forecastData }) => {
  console.log('Forecast Data:', forecastData); // Log the entire forecastData for reference

  const targetHrs = [6, 12, 18, 21];

  // Extract the list of forecasts from the forecastData
  const dailyTargetForecasts = forecastData.list.filter((hourly) =>
    targetHrs.includes(new Date(hourly.dt * 1000).getUTCHours())
  );

  // Function to format weekday
  const formatWeekdayAndDate = (timestamp) => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(timestamp * 1000);
    const weekday = weekdays[date.getUTCDay()];
    const formattedDate = date.toLocaleDateString();
    return `${weekday}, ${formattedDate}`;
  };

  // Function to format time of day
  const formatTimeOfDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getUTCHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours} ${ampm}`;
  };

  console.log('Daily Target Forecasts:', dailyTargetForecasts);

  return (
    <div className="w-full h-screen p-4">
      {dailyTargetForecasts.map((forecast, index) => (
        <div key={index}>
          <Image
            src={`https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
            alt={forecast.weather[0].description}
            width={60}
            height={60}
            priority
            className="w-12 h-12"
          />
          <p>{forecast.weather[0].description}</p>
          <p>{formatWeekdayAndDate(forecast.dt)}</p>
          <p>{formatTimeOfDay(forecast.dt)}</p>
          <p>Temperature: {Math.round(forecast.main.temp)}&deg;F</p>
          <p>Humidity: {Math.round(forecast.main.humidity)}%</p>
          <p>Wind Speed: {Math.round(forecast.wind.speed)} mph</p>
        </div>
      ))}
    </div>
  );
};

export default FiveDayForecast;

