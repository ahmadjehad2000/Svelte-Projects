const key = 'oXXLARAKfSZGGb9M8vhCGJJWTFCslh9t';

// get weather information
export const getWeather = async (id) => {
  const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  const data = await response.json();

  return data[0];
};

// get city information
export const getCity = async (city) => {
  const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  if (!response.ok) {
    throw new Error('Failed to fetch city data');
  }
  const data = await response.json();

  return data[0];
};