<script lang="ts">
import { countryCode } from 'emoji-flags';

  let singleCountryData: any | null = null;

  function countryLookup(short: string): string {
    singleCountryData = countryCode(short);
    return singleCountryData.emoji;
  }

  interface CurrentWeather {
    temperature: number;
    windspeed: number;
    sunrise: string[];
    sunset: string[];
    weathercode: number;
    is_day: number;
    time: string;
    winddirection: number;
  }

  interface DailyForecast {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    windspeed_10m_max: number[];
    windgusts_10m_max: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
    precipitation_sum: number[];
  }

  interface WeatherData {
    current_weather: CurrentWeather;
    daily: DailyForecast;
  }

  let weatherData: WeatherData | null = null;

  // // Fetch the JSON data from the API
  // fetch('https://api.open-meteo.com/v1/forecast?latitude=55.3785&longitude=10.4036&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,windspeed_10m_max,windgusts_10m_max&current_weather=true&timezone=Europe%2FBerlin')
  //   .then(response => response.json())
  //   .then((data: WeatherData) => {
  //     weatherData = data;
  //   });

  // Mock data
  weatherData = {
    latitude: 55.37911,
    longitude: 10.404785,
    generationtime_ms: 1.849055290222168,
    utc_offset_seconds: 7200,
    timezone: "Europe/Berlin",
    timezone_abbreviation: "CEST",
    elevation: 19.0,
    current_weather: {
      temperature: 16.5,
      windspeed: 34.6,
      winddirection: 227,
      weathercode: 51,
      is_day: 0,
      time: "2023-09-20T02:00",
    },
    daily_units: {
      time: "iso8601",
      weathercode: "wmo code",
      temperature_2m_max: "°C",
      temperature_2m_min: "°C",
      sunrise: "iso8601",
      sunset: "iso8601",
      uv_index_max: "",
      precipitation_sum: "mm",
      windspeed_10m_max: "km/h",
      windgusts_10m_max: "km/h",
    },
    daily: {
      time: [
        "2023-09-20",
        "2023-09-21",
        "2023-09-22",
        "2023-09-23",
        "2023-09-24",
        "2023-09-25",
        "2023-09-26",
      ],
      weathercode: [51, 51, 80, 2, 3, 3, 3],
      temperature_2m_max: [19.2, 24.5, 19.0, 16.6, 16.6, 17.9, 19.7],
      temperature_2m_min: [16.3, 16.6, 13.3, 11.9, 10.4, 11.9, 11.5],
      sunrise: [
        "2023-09-20T06:59",
        "2023-09-21T07:01",
        "2023-09-22T07:03",
        "2023-09-23T07:05",
        "2023-09-24T07:07",
        "2023-09-25T07:09",
        "2023-09-26T07:11",
      ],
      sunset: [
        "2023-09-20T19:24",
        "2023-09-21T19:21",
        "2023-09-22T19:18",
        "2023-09-23T19:16",
        "2023-09-24T19:13",
        "2023-09-25T19:11",
        "2023-09-26T19:08",
      ],
      uv_index_max: [3.35, 2.95, 3.05, 3.3, 3.55, 3.05, 3.45],
      precipitation_sum: [2.1, 0.6, 1.1, 0.3, 0.0, 0.0, 0.0],
      windspeed_10m_max: [37.8, 24.8, 21.2, 18.9, 15.5, 20.0, 12.4],
      windgusts_10m_max: [68.8, 45.0, 42.5, 43.2, 34.9, 37.1, 22.3],
    },
  };

    // Helper function to convert date to weekday
  function dateToWeekday(dateString: string): string {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',];
    const date = new Date(dateString);
    return days[date.getDay()];
  }

  function roundUp(num: number): number {
    return Math.round(num);
  }

  function extractTime(dateTimeString: string): string {
    return dateTimeString.split('T')[1];
  }
</script>

<!-- ########################### HTML ########################### -->

<!-- Location info -->
{#if weatherData}
<div class="text-center">
  <h1 class="text-5xl mt-4 font-bold">Odense, DK {countryLookup('DK')}</h1>
  <div class="mt-1 text-gray-500">
    <span class="text-center fill-white mr-2"><img src={`/weather-icons/sunrise.svg`} alt="Sunrise" class="inline mr-2"/>{extractTime(weatherData?.daily.sunrise[0])}</span>
    <span>|</span>
    <span class="text-center fill-white ml-2"><img src={`/weather-icons/sunset.svg`} alt="Sunset" class="inline mr-2"/>{extractTime(weatherData?.daily.sunset[0])}</span>
  </div>
  <!-- <p class="text-sm text-gray-400">{weatherData.current_weather.is_day ? 'Day' : 'Night'}</p> -->
</div>

<!-- Display current weather
<div>
  <h1>Current Weather</h1>
  <p>Temperature: {roundUp(weatherData.current_weather.temperature)}°C</p>
  <p>Windspeed: {roundUp(weatherData.current_weather.windspeed)} km/h</p>
</div> -->

<!-- Display current weather -->
<div class="flex justify-center my-20 items-center">
  <div class="border-2 border-gray-800 rounded-lg p-4 text-center mr-16 hover:scale-105 transition-transform duration-300 ease-in-out">
    <h1 class="text-lg font-medium mb-4"><img src={`/weather-icons/wind.svg`} alt="" class="inline mr-1">Wind Information</h1>
    <span class="text-4xl font-bold text-red-600">{roundUp(weatherData.current_weather.windspeed)} km/h</span>
    <p class="text-sm text-gray-400">Wind gusts: {roundUp(weatherData.daily.windgusts_10m_max[0])} km/h</p>
  </div>

  <!-- <div class="bg-gray-700 rounded-lg p-4 text-center">
    <h1 class="text-lg font-medium mb-4">Precipitation</h1>
    <span class="text-4xl font-bold">{roundUp(weatherData.daily.precipitation_sum[0])} mm</span>
    <p class="text-sm text-gray-400">Rain</p>
  </div> -->

  <div class="bg-gray-700 rounded-lg p-4 text-center hover:scale-105 transition-transform duration-300 ease-in-out">
    <h1 class="text-3xl font-medium">Current Weather</h1>
    <p class="text-sm text-gray-400 flex items-center justify-center"><img src={`/weather-icons/droplet.svg`} alt="droplet" class="inline mr-1">{weatherData.daily.precipitation_sum[0]} mm precipitation</p>
    <img src={`/weather-icons/rainy.svg`} alt="" width="120px" class="m-6 inline">
    <span class="block text-2xl font-extrabold">{roundUp(weatherData.current_weather.temperature)}°C</span>
    <span class="text-sm text-gray-400"><img src={`/weather-icons/thermometer.svg`} alt="termometer" width="14px" class="inline">{roundUp(weatherData.daily.temperature_2m_min[0])}°C | {roundUp(weatherData.daily.temperature_2m_max[0])}°C</span>
    <p class="mt-3 italic">Mainly clear, partly cloudy, and overcast</p>
  </div>

  <div class="border-2 border-gray-800 rounded-lg p-4 text-center ml-16 hover:scale-105 transition-transform duration-300 ease-in-out">
    <h1 class="text-lg font-medium mb-4">Highest UV-Index</h1>
    <span class="text-4xl font-bold text-green-600">{roundUp(weatherData.daily.uv_index_max[0])}</span>
    <p class="text-sm text-gray-400">Moderate</p>
  </div>
</div>

<!-- Display daily forecast -->
<div>
  <div class="flex justify-center">
    {#each weatherData.daily.time as day, index}
      {#if index !== 0}
        <div class="m-4 hover:scale-105 transition-transform duration-300 ease-in-out">
          <p class="text-center text-2xl mb-4"><strong>{dateToWeekday(day)}</strong></p>
          <div class="bg-gray-700 rounded-xl p-4"> <!-- border-2 border-gray-800 rounded-lg -->
            <img src={`/weather-icons/heavy-snow.png`} alt="" width="80px" class="m-6">
            <span class="block mb-1"><img src={`/weather-icons/wind.svg`} alt="" class="inline mr-1">{roundUp(weatherData.daily.windspeed_10m_max[index])} km/h</span>
            <span class="right-0"><img src={`/weather-icons/thermometer.svg`} alt="" class="inline mr-1">{roundUp(weatherData.daily.temperature_2m_min[index])}°C | {roundUp(weatherData.daily.temperature_2m_max[index])}°C</span>
          </div>
        </div>
      {/if}
    {/each}
  </div>
</div>
{:else}
  <div class="flex items-center justify-center h-screen">
    <span class="loading loading-spinner loading-lg"></span>
    <p class="ml-4">Loading</p>
  </div>
{/if}