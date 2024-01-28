import Image from "next/image";
import React from "react";

const CurrentWeather = ({ weatherData, city, state, currentTimeOfDay }) => {
  console.log("Current Time in CurrentWeather:", currentTimeOfDay);

  return (
    <div className={`w-full h-screen flex justify-center ${currentTimeOfDay >= 18 || currentTimeOfDay < 6 ? 'bg-bg-night-sky' : 'bg-bg-sunny'} bg-cover bg-fixed bg-no-repeat`}>
      <div className="w-full flex flex-col bg-white/30 rounded shadow-lg shadow-neutral-300">
        {weatherData && (
          <>
            {city && state && weatherData?.dt && (
              <div className="w-full py-4 px-4 text-white text-center border-b border-t-2 border-neutral-400 shadow-sm shadow-neutral-200 bg-blue-900/30">
                <h1 className='text-3xl'>Current Weather</h1>
                <h1 className='font-bold text-xl'>
                  {city}, {state}
                </h1>
                <p className='text-xs'>{new Date(weatherData?.dt * 1000).toLocaleDateString()}</p>
              </div>
            )}
            <div className='mx-6'>
              <div className="flex flex-col items-center justify-center mb-2">
                <Image
                  src={`https://openweathermap.org/img/w/${weatherData?.weather[0].icon}.png`}
                  alt={weatherData?.weather[0].description}
                  width={100}
                  height={100}
                  priority
                />
                <p className="w-full text-2xl text-white text-center capitalize">
                  {weatherData?.weather[0].description}
                </p>
              </div>

              <div className="space-y-3 mb-2 p-4 flex flex-col">
                <div className="flex justify-between">
                  <div className="flex flex-col items-center bg-blue-900/20 rounded-lg shadow-sm shadow-neutral-500 p-4">
                    <p className="text-xl font-semibold text-white pb-2">
                      Right Now
                    </p>
                    <p className="text-3xl text-neutral-600 font-semibold border px-3 py-1 rounded-lg bg-white/70">
                      {Math.round(weatherData?.main?.temp) ??
                        "No temperature data"}
                      &deg;F
                    </p>
                  </div>
                  <div className="flex flex-col items-center bg-blue-900/20 rounded-lg shadow-sm shadow-neutral-500 p-4">
                    <p className="text-xl font-semibold text-white pb-2">
                      Feels Like
                    </p>
                    <p className="text-3xl text-neutral-600 font-semibold border px-3 py-1 rounded-lg bg-white/70">
                      {Math.round(weatherData?.main?.feels_like) ??
                        "No temperature data"}
                      &deg;F
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center bg-blue-900/20 rounded-lg shadow-sm shadow-neutral-500 py-4 px-3">
                  <p className="text-2xl font-bold text-white pb-2">High / Low</p>
                  <div className="flex text-3xl text-neutral-600 font-semibold border px-3 py-1 rounded-lg bg-white/70">
                    <p>
                      {Math.round(weatherData?.main?.temp_max) ??
                        "No temperature data"}
                      &deg;F
                    </p>
                    &nbsp;/&nbsp;
                    <p>
                      {Math.round(weatherData?.main?.temp_min) ??
                        "No temperature data"}
                      &deg;F
                    </p>
                  </div>
                </div>
                <div className="mb-2 flex flex-col">
                  <div className="flex justify-center gap-4">
                    <div className="w-full flex flex-col items-center bg-blue-900/20 rounded-lg shadow-sm shadow-neutral-500 py-4 px-3">
                      <p className="text-xl font-bold text-white pb-2">Humidity</p>
                      <p className="text-2xl text-neutral-600 font-semibold border px-3 py-1 rounded-lg bg-white/70">
                        {Math.round(weatherData?.main?.humidity) ??
                          "No humidity data"}
                        %
                      </p>
                    </div>
                    {weatherData?.wind && (
                      <div className="w-full flex flex-col items-center bg-blue-900/20 rounded-lg shadow-sm shadow-neutral-500 py-4 px-3">
                        <p className="text-xl font-bold text-white pb-2">Wind</p>
                        <p className="text-2xl text-neutral-600 font-semibold border px-3 py-1 rounded-lg bg-white/70">
                          {Math.round(weatherData?.wind?.speed) ??
                            "No wind data"}
                          mph
                        </p>

                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className='text-xs mx-10 absolute bottom-0'>
          <h4>This app is made possible by the openweathermap.com api and photography by contributors from unsplash.com.</h4>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
