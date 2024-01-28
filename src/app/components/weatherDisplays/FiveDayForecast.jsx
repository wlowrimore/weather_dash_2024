import Image from "next/image";
import React from "react";

const FiveDayForecast = ({ forecastData, city, state }) => {
  console.log("Forecast Data:", forecastData); // Log the entire forecastData for reference

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

  console.log("Daily Target Forecasts:", dailyTargetForecasts);

  return (
    // Five Day Forecast Header
    <div className="bg-bg-sunset bg-fixed bg-cover bg-no-repeat">
      {city && state && forecastData.list[0].dt && (
        <div className="w-full py-4 px-4 text-white text-center border-b border-t-4 border-neutral-400 shadow-sm shadow-neutral-200 bg-red-500/20 rounded-t">
          <h1 className='text-3xl'>5-Day Forecast</h1>
          <h1 className='font-bold text-xl'>
            {city}, {state}
          </h1>
          <div className='w-full flex justify-center items-center'>
            <p className='text-xs'>{new Date(forecastData.list[0]?.dt * 1000).toLocaleDateString()}</p>&nbsp;-&nbsp;<p className='text-xs'>{new Date(forecastData.list[forecastData.list.length - 1]?.dt * 1000).toLocaleDateString()}</p>
          </div>
        </div>
      )}
      {/* Display the 5-day forecast */}
      <div className="rounded space-y-4 mx-6 my-12 md:grid md:grid-cols-2 lg:grid-cols-4">
        {dailyTargetForecasts.map((forecast, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center bg-white/30 mt-4 mx-4 p-4 rounded-lg shadow-md shadow-neutral-500"
          >
            <p className="font-semibold">{formatWeekdayAndDate(forecast.dt)}</p>
            <p className="text-3xl text-neutral-600 pt-4 font-semibold">
              {formatTimeOfDay(forecast.dt)}
            </p>
            <div className="flex flex-col items-center">
              <Image
                src={`https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                alt={forecast.weather[0].description}
                width={60}
                height={60}
                priority
                className="w-20 h-20"
              />
              <p className="font-semibold capitalize">
                {forecast.weather[0].description}
              </p>
            </div>
            <div className="w-fullpt-3 flex flex-col items-center space-y-2">
              <p className="text-3xl text-neutral-600 font-bold">
                {Math.round(forecast.main.temp)}&deg;F
              </p>
              <div className="w-full flex">
                <div className="flex justify-evenly gap-10 md:gap-28 lg:gap-8 xl:gap-32">
                  <div className="flex flex-col items-center p-2">
                    <h1 className="">Humidity</h1>
                    <p>{Math.round(forecast.main.humidity)}%</p>
                  </div>
                  <div className="flex flex-col items-center p-2">
                    <p className="">Wind</p>
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
