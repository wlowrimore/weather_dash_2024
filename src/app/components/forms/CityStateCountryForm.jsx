'use client'

import { useEffect, useState } from "react";
import CountriesDropdown from "../ui/CountriesDropdown";
import getCityLatLong from "@/app/libs/getCityWeather";

const CityStateCountryForm = () => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [cityStateCountryFormData, setCityStateCountryFormData] = useState({});

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log({ city, state, selectedCountry });

    if (!city || !state || !selectedCountry) {
      alert('Please enter a city and state, and select a country from the list');
      return;
    }
    // setCityStateCountryFormData({ city, state, selectedCountry });
    // console.log('City, State, and Selected Country', { cityStateCountryFormData });
    try {
      const latLongData = await getCityLatLong(city, state, selectedCountry)

      console.log('Latitude and Longitude Data:', latLongData);
    } catch (error) {
      console.error('Error fetching latitude and longitude data:', error);
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
    </div>
  );
};

export default CityStateCountryForm;