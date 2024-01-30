export default async function getCityLatLong(city, state, countryCode) {
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${countryCode}&appid=${API_KEY}`);

  if (!response.ok) {
    throw new Error('Failed to fetch this city\'s latitude and longitude');
  }

  const data = await response.json();

  return Array.isArray(data) ? data : [data];
}

