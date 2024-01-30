import Image from "next/image";
import React from "react";
import NewSearchIcon from "/public/images/new_search.webp";

const CurrentWeather = ({
  weatherData,
  city,
  state,
  currentTimeOfDay,
  onNewSearch,
}) => {
  return (
    <>
      {/* Display Current Time and New Search Icon */}
      <div
        onClick={onNewSearch}
        className="xl:w-[12rem] xl:py-2 xl:px-3 fixed z-10 right-0 top-0 bg-gray-900/30 text-white rounded-l-full xl:rounded-l-lg xl:gap-2 flex items-center px-2 cursor-pointer"
      >
        <Image
          src={NewSearchIcon}
          alt="New Search"
          width={16}
          height={16}
          className="cursor-pointer py-1 xl:w-[20%] xl:h-[20%] hover:animate-spin"
        />
        <p className="text-sm xl:text-xl px-1 py-1">new search</p>
      </div>
      <div
        className={`w-full h-screen flex justify-center ${currentTimeOfDay >= 18 || currentTimeOfDay < 6
          ? "bg-bg-night-sky"
          : "bg-bg-sunny"
          } bg-cover bg-fixed bg-no-repeat`}
      >
        <div className="w-full flex flex-col rounded shadow-lg shadow-neutral-300">
          {/* Display Current Weather */}
          {weatherData && (
            <>
              {/* Display Current Weather Header */}
              {city && state && weatherData?.dt && (
                <div className="w-full pb-4 pt-8 px-4 text-white text-center border-b border-t-2 border-neutral-400 shadow-sm shadow-neutral-200 bg-blue-900/30">
                  <h1 className="text-3xl">Current Weather</h1>
                  <h1 className="font-bold text-xl">
                    {city}, {state}
                  </h1>
                  <p className="text-xs">
                    {new Date(weatherData?.dt * 1000).toLocaleDateString()}
                  </p>
                </div>
              )}
              {/* Display Current Weather */}
              <div className="w-full flex justify-center md:my-44 xl:my-8 2xl:my-24">
                <div className="mx-6 md:w-screen xl:w-1/2 lg:p-4 2xl:p-12 lg:mt-0 md:bg-white/40 xl:rounded-lg xl:shadow-lg shadow-neutral-600">
                  <div className="flex flex-col items-center justify-center mb-2">
                    <Image
                      src={`https://openweathermap.org/img/w/${weatherData?.weather[0].icon}.png`}
                      alt={weatherData?.weather[0].description}
                      width={100}
                      height={100}
                      priority
                    />
                    <p className="w-full -mt-4 text-2xl text-white xl:text-gray-800 text-center capitalize">
                      {weatherData?.weather[0].description}
                    </p>
                  </div>
                  <div className="space-y-3 mb-2 p-4 flex flex-col">
                    <div className="flex justify-between md:gap-4 xl:gap-4">
                      <div className="md:w-full xl:w-full flex flex-col items-center bg-blue-900/20 rounded-lg shadow-sm shadow-neutral-500 p-4">
                        <p className="text-xl font-semibold text-white xl:text-gray-800 pb-2">
                          Right Now
                        </p>
                        <p className="text-3xl text-neutral-600 font-semibold border px-3 py-1 rounded-lg bg-white/70">
                          {Math.round(weatherData?.main?.temp) ??
                            "No temperature data"}
                          &deg;F
                        </p>
                      </div>
                      <div className="xl:w-1/2 flex flex-col items-center bg-blue-900/20 rounded-lg shadow-sm shadow-neutral-500 p-4">
                        <p className="text-xl font-semibold text-white xl:text-gray-800 pb-2">
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
                      <p className="text-2xl font-bold text-white xl:text-gray-800 pb-2">
                        High / Low
                      </p>
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
                          <p className="text-xl font-bold text-white xl:text-gray-800 pb-2">
                            Humidity
                          </p>
                          <p className="text-2xl text-neutral-600 font-semibold border px-3 py-1 rounded-lg bg-white/70">
                            {Math.round(weatherData?.main?.humidity) ??
                              "No humidity data"}
                            %
                          </p>
                        </div>
                        {weatherData?.wind && (
                          <div className="w-full flex flex-col items-center bg-blue-900/20 rounded-lg shadow-sm shadow-neutral-500 py-4 px-3">
                            <p className="text-xl font-bold text-white xl:text-gray-800 pb-2">
                              Wind
                            </p>
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
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CurrentWeather;
