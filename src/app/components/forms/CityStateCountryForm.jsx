'use client'

import { useEffect, useState } from "react";
import CountriesDropdown from "../ui/CountriesDropdown";
import getCityLatLong from "@/app/libs/getCityLatLon";
import getCityWeather from "@/app/libs/getCityWeather";
import CurrentWeather from "../weatherDisplays/CurrentWeather";
import getFiveDayForecast from "@/app/libs/getFiveDayForecast";
import FiveDayForecast from "../weatherDisplays/FiveDayForecast";
import RealTimeClock from "../ui/RealTimeClock";

const CityStateCountryForm = () => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [weatherData, setWeatherData] = useState('');
  const [forecastData, setForecastData] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [currentTimeOfDay, setCurrentTimeOfDay] = useState("");
  const [Error, setError] = useState('');

  useEffect(() => {
    const getTimeOfDay = () => {
      const currentHour = new Date().getHours();
      setCurrentTimeOfDay(currentHour);
    };
    getTimeOfDay();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!city || !state || !selectedCountry) {
      alert(
        "Please enter a city and state, and select a country from the list"
      );
      return;
    }
    try {
      const latLongData = await getCityLatLong(
        city,
        state,
        selectedCountry
      );
      const { lat, lon } = latLongData[0];

      const weatherData = await getCityWeather(lat, lon);
      setWeatherData(weatherData);

      const forecastData = await getFiveDayForecast(lat, lon);
      setForecastData(forecastData);

      console.log("Weather Data:", weatherData);
      console.log("Weather Forecast:", forecastData.list);

      // Toggle the form visibility after successfully fetching data
      setIsFormVisible(false);
    } catch (error) {
      setError('Your search could not be found. Please check your spelling and try again.');
      console.error("Error fetching data:", error);
    }
  };

  const handleCountrySelect = (countryCode) => {
    setSelectedCountry(countryCode);
  };

  const handleNewSearch = () => {
    // Toggle the form visibility when "New Search" is clicked
    setIsFormVisible(true);
    // Reset weather and forecast data
    setWeatherData('');
    setForecastData('');
  };

  return (
    <div className="w-full">

      <RealTimeClock />

      {isFormVisible ? (
        <div className="w-full h-screen p-6 rounded-lg flex flex-col items-center justify-center bg-bg-clouds bg-no-repeat bg-cover bg-fixed">
          {Error && <p className="absolute z-10 right-0 top-8 w-full md:w-1/2 lg:w-[45%] xl:w-[33%] 2xl:w-[25%] md:top-16 lg:top-20 2xl:top-36 2xl:right-[43.5rem] md:right-44 lg:right-[17rem] xl:right-[29rem] py-2 px-6 rounded-lg text-xl md:text-2xl text-red-500 mb-4">{Error}</p>}
          <form
            className="flex flex-col bg-white/10 px-4 py-6 rounded-lg"
            onSubmit={handleFormSubmit}
          >
            <div className="text-white space-y-[-2rem] mb-6">
              <h1 className="text-2xl font-semibold mb-6">WELCOME TO</h1>
              <h1 className="text-4xl font-semibold mb-6">MyWeather</h1>
            </div>
            <div className="mb-4 flex flex-col">
              <h2 className="text-white font-semibold">City</h2>
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border border-neutral-400 rounded-sm py-1 px-2 outline-none bg-gray-100"
                required
              />
            </div>
            <div className="mb-4 flex flex-col">
              <h2 className="text-white font-semibold">State / Province</h2>
              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="border border-neutral-400 rounded-sm py-1 px-2 outline-none bg-gray-100"
                required
              />
            </div>
            <h2 className="text-white font-semibold">Country</h2>
            <CountriesDropdown onCountrySelect={handleCountrySelect} />
            <button className="text-white bg-cyan-900/80 border border-neutral-400 rounded-sm py-1 px-2 mt-6 transition-all hover:scale-95 hover:bg-cyan-800/90 duration-300" type="submit">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center">
          <CurrentWeather
            weatherData={weatherData}
            city={city}
            state={state}
            currentTimeOfDay={currentTimeOfDay}
            onNewSearch={handleNewSearch}
          />
          <FiveDayForecast
            forecastData={forecastData}
            city={city}
            state={state}
          />
        </div>
      )}
    </div>
  );
};

export default CityStateCountryForm;