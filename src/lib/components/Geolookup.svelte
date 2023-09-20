<script lang="ts">
    import mockGeoData from "$lib/mockGeoData.json";
    import { searchSuccess } from "../../routes/stores";
    import Weather from "./Weather.svelte";

    let city: string = "";
    let search: App.SearchData | null = null;
    let found: boolean = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let selectedResult: App.Result | null = null; 
    let isFinished: boolean = false;
    $: isFinished = $searchSuccess;

    let userSelection: {
        city: string,
        country: string,
        country_code: string,
        coordinates: {
            latitude: number,
            longitude: number,
        }
    }

    function fetchSearchData() {
        if (timer !== null) {
            clearTimeout(timer);
        }

        // Set a new timer to wait for 2 seconds after the user stops typing
        timer = setTimeout(async () => {
            if (city.length > 0) {
                try {
                    const response = await fetch(
                        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=3&language=en&format=json`
                    );
                    const data = await response.json();
                    search = data;
                    console.log(search);
                    found = true;
                } catch (error) {
                    console.error(error);
                }
            } else {
                alert("Please enter a city name");
                found = false;
            }
        }, 2000);
    }

    function getMockData() {
        search = mockGeoData;
        found = true;
    }

    function handleResultClick(result: App.Result) {
        selectedResult = result;
        userSelection = {
            city: result.name,
            country: result.country,
            country_code: result.country_code,
            coordinates: {
                latitude: result.latitude,
                longitude: result.longitude,
            }
        }
        console.log("Selected Result:", selectedResult);
        searchSuccess.set(true);
    }
</script>


{#if !isFinished}
<h1 class="text-5xl mt-4 font-bold absolute p-4">Weaterly</h1>
    <div class="flex flex-col justify-center h-screen w-1/4 mx-auto">
        <h1 class="text-3xl font-bold mb-4">Enter City Name</h1>
        <input
            type="text"
            bind:value={city}
            placeholder="Copenhagen..."
            class="border border-gray-300 rounded-md p-2 w-full"
            on:input={getMockData}
        />

        {#if found && search !== null}
            <div class="mt-4">
                <div class="flex flex-col justify-center">
                    {#each search.results as result (result.id)}
                        <button
                            class="flex flex-col justify-center border border-gray-300 rounded-md p-2 w-full mb-2"
                            on:click={() => handleResultClick(result)}
                            style="cursor: pointer;"
                        >
                            <p class="text-lg font-bold">{result.name}, {result.country_code}</p>
                            <p class="text-sm text-gray-500">Country: {result.country}</p>
                            <p class="text-sm text-gray-500">Coordinates: {result.latitude} {result.longitude}</p>
                        </button>
                    {/each}
                </div>
            </div>
        {/if}

        <!-- {#if selectedResult !== null}
        <div class="mt-4">
            <div class="flex flex-col justify-center">
                <h2 class="text-xl font-bold">Selected Result:</h2>
                <p class="text-lg font-bold">{selectedResult.name}</p>
                <p class="text-sm text-gray-500">Country: {selectedResult.country}</p>
                <p class="text-sm text-gray-500">Coordinates: {selectedResult.latitude} {selectedResult.longitude}</p>
            </div>
        </div>
    {/if} -->
    </div>
{:else}
    <Weather selected={userSelection} />
{/if}

