import Image from 'next/image';
import React from 'react';

const CurrentWeather = ({ weatherData, city, state }) => {
  return (
    <div className='w-full p-4'>
      <div className='flex flex-col border border-neutral-400 bg-gray-100 rounded-sm shadow-lg shadow-neutral-300'>
        {weatherData && (
          <>
            {city && state && (
              <h1 className='w-full py-2 px-4 text-2xl font-bold border-b border-neutral-400 shadow-md shadow-neutral-400 bg-orange-200'>{city}, {state}</h1>
            )}
            <div className='flex flex-col px-12 leading-snug text-center'>
              <Image
                src={`https://openweathermap.org/img/w/${weatherData?.weather[0].icon}.png`}
                alt={weatherData?.weather[0].description}
                width={80}
                height={80}
                className='mx-auto'
                priority
              />
              <p className='mt-[-1.3rem]'>{weatherData?.weather[0].description}</p>
            </div>

            <div className='space-y-1 my-2 p-4 flex flex-col'>
              <p className='text-lg font-semibold'>Right Now: <span className='font-normal border border-white px-1 rounded bg-white'>{Math.round(weatherData?.main?.temp) ?? 'No temperature data'}&deg;</span></p>
              <p className='text-lg font-semibold'>Feels Like: <span className='font-normal border border-white px-1 rounded bg-white'>{Math.round(weatherData?.main?.feels_like) ?? 'No temperature data'}&deg;</span></p>
              <div className='flex flex-col'>
                <p className='text-lg font-semibold'>High / Low:</p>
                <div className='flex'>
                  <p>{Math.round(weatherData?.main?.temp_max) ?? 'No temperature data'}&deg;</p>/
                  <p>{Math.round(weatherData?.main?.temp_min) ?? 'No temperature data'}&deg;</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CurrentWeather;