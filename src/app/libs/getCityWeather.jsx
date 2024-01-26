// export default async function getCityLatLong() {
//   const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=Nashville,TN,US&appid=cb87d742151d896a30603c77f66b0bef');

//   if (!response.ok) {
//     throw new Error('Failed to fetch this city\'s lattitude and longitude');
//   }

//   return await response.json();
// }


export default async function getCityLatLong(city, state, countryCode) {
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${countryCode}&appid=cb87d742151d896a30603c77f66b0bef`);

  if (!response.ok) {
    throw new Error('Failed to fetch this city\'s latitude and longitude');
  }

  return await response.json();
}