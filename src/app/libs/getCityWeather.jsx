export default async function getCityWeather(lat, lon) {
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`);

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