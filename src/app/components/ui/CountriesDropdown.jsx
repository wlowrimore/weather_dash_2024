'use client'

import { useEffect, useState } from "react";

const CountriesDropdown = ({ onCountrySelect }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState('');

  // Fetch countries and maps them to the countries dropdown list
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('/countries/data.json');
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  const handleCountryChange = (e) => {
    const selectedCountryCode = e.target.value;
    setSelectedCountryCode(selectedCountryCode);
    onCountrySelect(selectedCountryCode);
  };

  return (
    <div className='w-full'>
      <label htmlFor='countries'></label>
      <select
        id="countries"
        onChange={handleCountryChange}
        value={selectedCountryCode}
        className='w-full border border-neutral-400 rounded-sm p-1 outline-none bg-gray-100'
      >
        <option value="" disabled>Select a country</option>
        {countries.map((country, index) => (
          <option key={index} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountriesDropdown;