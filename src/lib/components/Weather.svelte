<script lang="ts">
    import { countryCode } from 'emoji-flags';
    import mockData from '$lib/mockData.json';
    import codeData from '$lib/codeData.json';
    import { onMount } from 'svelte';
    import { isRainy } from '../../routes/stores';

    export let selected: {
        city: string,
        country: string,
        country_code: string,
        coordinates: {
            latitude: number,
            longitude: number,
        }
    }
    
    let windTextColor = ''; 
    let uvIndexColor = '';
    let windSpeed = 0; 
    let uvIndex = 0;
    let uvScale = ''
    let singleCountryData: any | null = null;
    let weatherData: App.WeatherData | null = null;
    let weatherCode = JSON.parse(JSON.stringify(codeData[0]));
    const weatherCodeArray = Object.keys(weatherCode).map((code) => {
        return {
            code: parseInt(code),
            description: weatherCode[code].description,
            icon: weatherCode[code].icon,
        };
    });

    // Fetch the JSON data from the API
    async function fetchData(data: any) {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${data.coordinates.latitude}&longitude=${data.coordinates.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,windspeed_10m_max,windgusts_10m_max&current_weather=true&timezone=Europe%2FBerlin`)
          .then(response => response.json())
          .then((data: App.WeatherData) => {
            weatherData = data;
          });
    }

    // Mock data
    // weatherData = mockData;

    // Helper function to convert date to weekday
    function dateToWeekday(dateString: string): string {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(dateString);
        return days[date.getDay()];
    }

    function roundUp(num: number): number {
        return Math.round(num);
    }

    function extractTime(dateTimeString: string): string {
        return dateTimeString.split('T')[1];
    }

    function countryLookup(short: string): string {
        singleCountryData = countryCode(short);
        return singleCountryData.emoji;
    }

    // Fetch the data when the component is mounted
    $: if (selected) {
        fetchData(selected);
    }

     // Function to translate weathercode to icon
     function translateWeathercode(code: number) {
        const foundItem = weatherCodeArray.find((item) => item.code === code);
        if (foundItem) {
            return foundItem.icon;
        }
        // Return a default icon if code is not found
        return 'error.png';
    }

    onMount(() => {
        if (weatherData && weatherData?.current_weather.weathercode >= 51) {
            isRainy.set(true);
        } else {
            isRainy.set(false);
        }
    });

    function goBack() {
        location.reload();
    }

    $: {
        if (weatherData) {
            windSpeed = roundUp(weatherData.current_weather?.windspeed);

            // Check if it's rainy based on wind speed or other criteria
            if (windSpeed < 10) {
                windTextColor = 'text-blue-600';
            } else if (windSpeed < 30) {
                windTextColor = 'text-green-600';
            } else if (windSpeed < 40) {
                windTextColor = 'text-yellow-600';
            } else if (windSpeed < 80) {
                windTextColor = 'text-orange-600';
            } else {
                windTextColor = 'text-red-600';
            }

            uvIndex = roundUp(weatherData.daily.uv_index_max[0]);

            // Check if it's rainy based on wind speed or other criteria
            if (uvIndex <= 2) {
                uvIndexColor = 'text-green-600';
                uvScale = 'Low';
            } else if (uvIndex <= 5) {
                uvIndexColor = 'text-yellow-600';
                uvScale = 'Moderate';
            } else if (uvIndex <= 7) {
                uvIndexColor = 'text-orange-600';
                uvScale = 'High';
            } else if (uvIndex <= 10) {
                uvIndexColor = 'text-red-600';
                uvScale = 'Very High';
            } else {
                uvIndexColor = 'text-purple-600';
                uvScale = 'Extreme';
            }
        }
    }
    
</script>
    
<!-- ########################### HTML ########################### -->
    
<!-- Location info -->
<div class="h-screen mt-8">
    {#if weatherData}
        <div class="text-center">
            <h1 class="text-5xl mt-4 font-bold">{selected.city}, {selected.country} {countryLookup(selected.country_code)}</h1>
            <div class="mt-3 text-gray-500">
                <span class="text-center fill-white mr-2"><img src={`/weather-icons/sunrise.svg`} alt="Sunrise" class="inline mr-2"/>{extractTime(weatherData?.daily.sunrise[0])}</span>
                <span>|</span>
                <span class="text-center fill-white ml-2"><img src={`/weather-icons/sunset.svg`} alt="Sunset" class="inline mr-2"/>{extractTime(weatherData?.daily.sunset[0])}</span>
            </div>
            <!-- <p class="text-sm text-gray-400">{weatherData.current_weather.is_day ? 'Day' : 'Night'}</p> -->
        </div>

        <!-- Display current weather -->
        <div class="flex justify-center my-20 items-center">
            <div class="border-2 border-gray-800 rounded-lg p-4 text-center mr-16 hover:scale-105 transition-transform duration-300 ease-in-out">
                <h1 class="text-lg font-medium mb-4"><img src={`/weather-icons/wind.svg`} alt="" class="inline mr-1">Wind Information</h1>
                <span class="text-4xl font-bold {windTextColor}">{roundUp(weatherData.current_weather.windspeed)} km/h</span>
                <p class="text-sm text-gray-400">Wind gusts: {roundUp(weatherData.daily.windgusts_10m_max[0])} km/h</p>
            </div>

            <!-- <div class="bg-gray-700 rounded-lg p-4 text-center">
                <h1 class="text-lg font-medium mb-4">Precipitation</h1>
                <span class="text-4xl font-bold">{roundUp(weatherData.daily.precipitation_sum[0])} mm</span>
                <p class="text-sm text-gray-400">Rain</p>
            </div> -->

            <div class="bg-gray-700 rounded-lg p-4 text-center hover:scale-105 transition-transform duration-300 ease-in-out">
                <h1 class="text-3xl font-medium">Today</h1>
                <p class="text-sm text-gray-400 flex items-center justify-center"><img src={`/weather-icons/droplet.svg`} alt="droplet" class="inline mr-1">{weatherData.daily.precipitation_sum[0]} mm precipitation</p>
                <img src={`/weather-icons/${translateWeathercode(weatherData.current_weather.weathercode)}`} alt="" width="120px" class="m-6 inline">
                <span class="block text-2xl font-extrabold">{roundUp(weatherData.current_weather.temperature)}°C</span>
                <span class="text-sm text-gray-400"><img src={`/weather-icons/thermometer.svg`} alt="termometer" width="14px" class="inline">{roundUp(weatherData.daily.temperature_2m_min[0])}°C | {roundUp(weatherData.daily.temperature_2m_max[0])}°C</span>
                <p class="mt-3 italic">Mainly clear, partly cloudy, and overcast</p>
            </div>

            <div class="border-2 border-gray-800 rounded-lg p-4 text-center ml-16 hover:scale-105 transition-transform duration-300 ease-in-out">
                <h1 class="text-lg font-medium mb-4">Highest UV-Index</h1>
                <span class="text-4xl font-bold {uvIndexColor}">{roundUp(weatherData.daily.uv_index_max[0])}</span>
                <p class="text-sm text-gray-400">{uvScale}</p>
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
                    <img src={`/weather-icons/${translateWeathercode(weatherData.daily.weathercode[index])}`} alt="" width="80px" class="m-6">
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
</div>

<div class="top-4 left-4 absolute">
    <button on:click={goBack} class="bg-gray-600 text-white p-4 rounded-md hover:bg-gray-700 transition-colors duration-300 ease-in-out">Change</button>
</div>