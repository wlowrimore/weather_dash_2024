export default async function getCityWeather(lat, lon) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=cb87d742151d896a30603c77f66b0bef`);

    if (!response.ok) {
      console.error('Error Response:', response)
      throw new Error('Failed to fetch this city\'s weather');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error;
  }

}