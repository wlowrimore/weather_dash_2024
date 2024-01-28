'use client'

import { useEffect, useState } from "react";
import CountriesDropdown from "../ui/CountriesDropdown";
import getCityLatLong from "@/app/libs/getCityLatLon";
import getCityWeather from "@/app/libs/getCityWeather";
import CurrentWeather from "../weatherDisplays/CurrentWeather";
import getFiveDayForcast from "@/app/libs/getFiveDayForecast";
import FiveDayForecast from "../weatherDisplays/FiveDayForecast";

const CityStateCountryForm = () => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    const getCurrentTime = () => {
      const currentTime = new Date().toLocaleTimeString();
      console.log('Current Time:', currentTime);
    }
    getCurrentTime()
  }, [])


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log({ city, state, selectedCountry });

    if (!city || !state || !selectedCountry) {
      alert('Please enter a city and state, and select a country from the list');
      return;
    }
    try {
      const latLongData = await getCityLatLong(city, state, selectedCountry)
      const { lat, lon } = latLongData[0];

      const weatherData = await getCityWeather(lat, lon);
      setWeatherData(weatherData);

      const forecastData = await getFiveDayForcast(lat, lon);
      setForecastData(forecastData);

      console.log('Weather Data:', weatherData);
      console.log('Weather Forecast:', forecastData.list);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCountrySelect = (countryCode) => {
    setSelectedCountry(countryCode);
  };

  const handleOnClick = () => {
    setFormIsVisible(!formIsVisible);
    console.log('Form Is Visible:', formIsVisible);
  }

  return (
    <div className='w-full flex flex-col justify-center'>
      <div className={`${formIsVisible ? 'hidden' : 'flex flex-col pt-36 items-center bg-bg-clouds bg-no-repeat bg-cover bg-fixed h-screen text-gray-300'}`}>
        <div className='flex flex-col mx-8'>
          <h1 className='text-5xl text-start mb-1'>MyWeather</h1>
          <h2 className='text-xl tracking-wide'>Enter a city, state or province, and country to find the current weather conditions and five day forecast.</h2>
          <div className='w-full flex justify-end my-8'>
            <h3 onClick={handleOnClick} className='w-full text-center text-xl py-2 px-3 mr-4 bg-red-600/30 rounded-lg'>Get Started</h3>
          </div>
        </div>
      </div>
      {weatherData && forecastData ? (
        <>
          <CurrentWeather weatherData={weatherData} city={city} state={state} currentTime={currentTime} />
          <FiveDayForecast forecastData={forecastData} city={city} state={state} />
        </>
      ) : (
        <>
          {formIsVisible && (
            <div className='w-full h-screen p-6 rounded-lg flex flex-col items-center justify-center bg-bg-sunny bg-no-repeat bg-cover bg-fixed'>
              <form className='flex flex-col bg-white/40 px-4 py-6 rounded-lg' onSubmit={handleFormSubmit}>
                <div className='space-y-[-2rem] mb-6'>
                  <h1 className='text-2xl font-semibold mb-6'>WELCOME TO</h1>
                  <h1 className='text-4xl font-semibold mb-6'>MyWeather</h1>
                </div>
                <div className='mb-4 flex flex-col'>
                  <h2 className='text-gray-600 font-semibold'>City</h2>
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className='border border-neutral-400 rounded-sm py-1 px-2 outline-none bg-gray-100'
                  />
                </div>
                <div className='mb-4 flex flex-col'>
                  <h2 className='text-gray-600 font-semibold'>State / Province</h2>
                  <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className='border border-neutral-400 rounded-sm py-1 px-2 outline-none bg-gray-100'
                  />
                </div>
                <h2 className="text-gray-600 font-semibold">Country</h2>
                <CountriesDropdown onCountrySelect={handleCountrySelect} />
                <button className='border border-neutral-400 bg-emerald-500/50 rounded-sm py-1 px-2 mt-6' type="submit">Submit</button>
              </form>
            </div>
          )}
          {/* </div> */}
        </>
      )}
    </div>
  );
};

export default CityStateCountryForm;


