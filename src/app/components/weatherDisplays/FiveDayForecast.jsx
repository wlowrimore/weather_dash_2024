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
    <div className='mt-24 bg-slate-700/10'>
      <div className='w-full py-2 px-4 text-blue-50 text-center border-b border-neutral-400 shadow-md shadow-neutral-400 bg-slate-500 rounded-t'>
        <h1 className="text-3xl">5-Day Forecast</h1>
      </div>
      <div className=" rounded space-y-4">
        {dailyTargetForecasts.map((forecast, index) => (
          <div key={index} className='flex flex-col justify-center items-center bg-blue-200 mt-4 mx-4 p-4 border-4 border-white rounded-lg shadow-md shadow-neutral-500'>
            <p className='font-semibold'>{formatWeekdayAndDate(forecast.dt)}</p>
            <p className='text-3xl text-neutral-600 pt-4 font-semibold'>{formatTimeOfDay(forecast.dt)}</p>
            {/* <div> */}
            <div className='flex flex-col items-center'>
              <Image
                src={`https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                alt={forecast.weather[0].description}
                width={60}
                height={60}
                priority
                className="w-20 h-20"
              />
              <p className='font-semibold capitalize'>{forecast.weather[0].description}</p>
            </div>
            {/* </div> */}
            <div className='w-fullpt-3 flex flex-col items-center space-y-2'>

              <p className='text-3xl text-neutral-600 font-bold'>{Math.round(forecast.main.temp)}&deg;F</p>
              <div className='w-full flex'>
                <div className='flex w-screen justify-evenly'>
                  <div className='flex flex-col items-center p-2'>
                    <h1 className=''>Humidity</h1>
                    <p>{Math.round(forecast.main.humidity)}%</p>
                  </div>
                  <div className='flex flex-col items-center p-2'>
                    <p className=''>Wind</p>
                    <p>{Math.round(forecast.wind.speed)} mph</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiveDayForecast;

