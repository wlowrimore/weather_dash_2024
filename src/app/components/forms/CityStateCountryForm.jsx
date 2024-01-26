'use client'

import { useEffect, useState } from "react";
import CountriesDropdown from "../ui/CountriesDropdown";
import getCityLatLong from "@/app/libs/getCityLatLon";
import getCityWeather from "@/app/libs/getCityWeather";

const CityStateCountryForm = () => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log({ city, state, selectedCountry });

    if (!city || !state || !selectedCountry) {
      alert('Please enter a city and state, and select a country from the list');
      return;
    }
    try {
      const latLongData = await getCityLatLong(city, state, selectedCountry)
      // console.log('LatLong Data:', latLongData);
      // const lat = latLongData[0].lat;
      // const lon = latLongData[0].lon;
      const { lat, lon } = latLongData[0];
      // console.log("Latitude:", lat, "Longitude:", lon);

      const weatherData = await getCityWeather(lat, lon);
      setWeatherData(weatherData);

      console.log('Weather Data:', weatherData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCountrySelect = (countryCode) => {
    setSelectedCountry(countryCode);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
        <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
        <CountriesDropdown onCountrySelect={handleCountrySelect} />
        <button className='mr-[0.5rem]' type="submit">Submit</button>
      </form>
      <p>{city}, {state}</p>
      {weatherData && (
        <p>Temperature: {Math.round(weatherData?.main?.temp) ?? 'No temperature data'}</p>
      )}
    </div>
  );
};

export default CityStateCountryForm;


