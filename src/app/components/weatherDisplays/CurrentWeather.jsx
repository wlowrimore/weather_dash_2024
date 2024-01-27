import Image from "next/image";
import Link from "next/link";
import React from "react";

const CurrentWeather = ({ weatherData, city, state }) => {
  return (
    <div className="w-full h-screen p-4">
      <div className="flex flex-col border border-neutral-400 bg-blue-100 rounded-sm shadow-lg shadow-neutral-300">
        {weatherData && (
          <>
            {city && state && weatherData?.dt && (
              <div className="w-full py-2 px-4 text-blue-50 text-center border-b border-neutral-400 shadow-md shadow-neutral-400 bg-blue-500">
                <h1 className='text-3xl'>Current Weather</h1>
                <h1 className='font-bold text-xl'>
                  {city}, {state}
                </h1>
                <p className='text-xs'>{new Date(weatherData?.dt * 1000).toLocaleDateString()}</p>
              </div>
            )}
            <div className="flex items-center justify-center mt-4 mx-4 bg-slate-600/40 border-2 border-white rounded-lg py-2">
              <div className="w-full h-[2.3rem] mx-2 px-4 rounded-lg flex items-center justify-between bg-white">
                <Image
                  src={`https://openweathermap.org/img/w/${weatherData?.weather[0].icon}.png`}
                  alt={weatherData?.weather[0].description}
                  width={60}
                  height={60}
                  priority
                />
                <p className="w-full font-semibold text-end capitalize">
                  {weatherData?.weather[0].description}
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-2 p-4 flex flex-col">
              <div className="flex justify-between">
                <div className="flex flex-col items-center border-2 bg-slate-600/40 border-white rounded-lg shadow-md shadow-neutral-600 py-4 px-3">
                  <p className="text-xl font-semibold text-white pb-2">
                    Right Now
                  </p>
                  <p className="text-3xl font-semibold border border-white px-3 py-1 rounded-lg bg-white">
                    {Math.round(weatherData?.main?.temp) ??
                      "No temperature data"}
                    &deg;
                  </p>
                </div>
                <div className="flex flex-col items-center border-2 bg-slate-600/40 border-white rounded-lg shadow-md shadow-neutral-600 py-4 px-3">
                  <p className="text-xl font-semibold text-white pb-2">
                    Feels Like
                  </p>
                  <p className="text-3xl font-semibold border border-white px-3 py-1 rounded-lg bg-white">
                    {Math.round(weatherData?.main?.feels_like) ??
                      "No temperature data"}
                    &deg;
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center border-2 bg-slate-600/40 border-white rounded-lg shadow-md shadow-neutral-600 py-4 px-3">
                <p className="text-2xl font-bold text-white pb-2">High / Low</p>
                <div className="flex text-3xl font-semibold border border-white px-3 py-1 rounded-lg bg-white">
                  <p>
                    {Math.round(weatherData?.main?.temp_max) ??
                      "No temperature data"}
                    &deg;
                  </p>
                  &nbsp;/&nbsp;
                  <p>
                    {Math.round(weatherData?.main?.temp_min) ??
                      "No temperature data"}
                    &deg;
                  </p>
                </div>
              </div>
              <div className="mb-2 flex flex-col">
                <div className="flex justify-center gap-4">
                  <div className="w-full flex flex-col items-center border-2 bg-slate-600/40 border-white rounded-lg shadow-md shadow-neutral-600 py-4 px-3">
                    <p className="text-xl font-bold text-white pb-2">Humidity</p>
                    <p className="text-2xl font-semibold border border-white px-3 py-1 rounded-lg bg-white">
                      {Math.round(weatherData?.main?.humidity) ??
                        "No humidity data"}
                      %
                    </p>
                  </div>
                  {weatherData?.wind && (
                    <div className="w-full flex flex-col items-center border-2 bg-slate-600/40 border-white rounded-lg shadow-md shadow-neutral-600 py-4 px-3">
                      <p className="text-xl font-bold text-white pb-2">Wind</p>
                      <p className="text-2xl font-semibold border border-white px-3 py-1 rounded-lg bg-white">
                        {Math.round(weatherData?.wind?.speed) ??
                          "No wind data"}
                        mph
                      </p>

                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className='text-center my-6 bg-blue-500 rounded-lg py-1'>
        <Link href='#' className='text-white font-semibold'><h3>Five Day Forecast</h3></Link>
      </div>
    </div>
  );
};

export default CurrentWeather;
