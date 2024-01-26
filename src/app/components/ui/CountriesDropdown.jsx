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
    <div>
      <label htmlFor='countries'>Select a country:</label>
      <select id="countries" onChange={handleCountryChange} value={selectedCountryCode}>
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