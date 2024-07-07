<script>
  import { getWeather, getCity } from '../data/Forecast.js';

  let inputValue = '';
  let weatherData = null;
  let cityData = null;
  let error = null;

  const sunSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="weather-icon"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const moonSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="weather-icon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

  const fetchWeather = async (location) => {
      try {
          cityData = await getCity(location);
          if (cityData && cityData.Key) {
              weatherData = await getWeather(cityData.Key);
              error = null;
          } else {
              error = "City not found";
          }
      } catch (err) {
          console.error(err);
          error = "An error occurred while fetching weather data";
      }
  }

  $: if (inputValue) {
      fetchWeather(inputValue);
  }

  function isNightTime(weatherIcon) {
      return weatherIcon >= 33 && weatherIcon <= 44;
  }
</script>

<div class="container">
  <h1 class="app-title">Simple Weather Forecast</h1>

  <div class="search-container">
      <input type="text" bind:value={inputValue} placeholder="Enter a location for weather information" class="search-input">
  </div>
  
  {#if error}
      <div class="error-message">{error}</div>
  {/if}

  {#if weatherData && cityData}
      <div class="weather-card">
          <div class="location">
              <h2>{cityData.LocalizedName}</h2>
              <p>{cityData.Country.LocalizedName}</p>
          </div>
          <div class="weather-info">
              <div class="temperature">
                  <span class="temp-value">{Math.round(weatherData.Temperature.Metric.Value)}</span>
                  <span class="temp-unit">°C</span>
              </div>
              <div class="weather-condition">
                  {@html isNightTime(weatherData.WeatherIcon) ? moonSVG : sunSVG}
                  <p>{weatherData.WeatherText}</p>
              </div>
          </div>
          </div>
  {/if}
</div>

<style>
  :global(body) {
      background: #1a1a2e;
      color: #e0e0e0;
      font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
  }

  .container {
      width: 100%;
      max-width: 400px;
      padding: 2rem;
  }

  .app-title {
      font-size: 2rem;
      color: #4a90e2;
      text-align: center;
      margin-bottom: 2rem;
  }

  .search-container {
      margin-bottom: 2rem;
  }

  .search-input {
      width: 100%;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      border: none;
      background-color: #16213e;
      color: #e0e0e0;
      border-radius: 8px;
      transition: box-shadow 0.3s ease;
  }

  .search-input:focus {
      outline: none;
      box-shadow: 0 0 0 2px #4a90e2;
  }

  .error-message {
      background-color: #ff6b6b;
      color: #fff;
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 1rem;
  }

  .weather-card {
      background-color: #16213e;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .location h2 {
      font-size: 1.5rem;
      margin: 0;
  }

  .location p {
      font-size: 1rem;
      color: #b0b0b0;
      margin: 0.5rem 0 0;
  }

  .weather-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;
  }

  .temperature {
      font-size: 3rem;
      font-weight: 700;
  }

  .temp-unit {
      font-size: 1.5rem;
      font-weight: 400;
      color: #b0b0b0;
  }

  .weather-condition {
      text-align: center;
  }

  :global(.weather-icon) {
      width: 64px;
      height: 64px;
      color: #4a90e2;
  }

  .weather-condition p {
      margin: 0.5rem 0 0;
      font-size: 1rem;
  }

</style>