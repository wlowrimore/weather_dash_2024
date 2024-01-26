export default async function getCityLatLong(city, state, countryCode) {
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${countryCode}&appid=cb87d742151d896a30603c77f66b0bef`);

  if (!response.ok) {
    throw new Error('Failed to fetch this city\'s latitude and longitude');
  }

  const data = await response.json();

  return Array.isArray(data) ? data : [data];
}

