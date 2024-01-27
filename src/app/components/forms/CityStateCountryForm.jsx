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

  return (
    <div className='w-full flex flex-col justify-center'>
      {weatherData && forecastData ? (
        <>
          <CurrentWeather weatherData={weatherData} city={city} state={state} />
          <FiveDayForecast forecastData={forecastData} />
        </>
      ) : (
        <div className='p-6 bg-blue-100 border border-neutral-700 rounded'>

          <form className='flex flex-col space-y-4' onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className='border border-neutral-400 rounded-sm py-1 px-2 outline-none bg-gray-100'
            />
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className='border border-neutral-400 rounded-sm py-1 px-2 outline-none bg-gray-100'
            />
            <CountriesDropdown onCountrySelect={handleCountrySelect} />
            <button className='border border-neutral-400 bg-emerald-500/50 rounded-sm py-1 px-2' type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CityStateCountryForm;


