// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface CurrentWeather {
			temperature: number;
			windspeed: number;
			weathercode: number;
			is_day: number;
			time: string;
		  }
		
		  interface DailyForecast {
			time: string[];
			weathercode: number[];
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
			latitude: number;
			longitude: number;
			generationtime_ms: number;
			utc_offset_seconds: number;
			timezone: string;
			timezone_abbreviation: string;
			elevation: number;
			current_weather: CurrentWeather;
			daily: DailyForecast;
		  }

		  interface Result {
			id: number;
			name: string;
			latitude: number;
			longitude: number;
			elevation: number;
			feature_code: string;
			country_code: string;
			admin1_id: number;
			admin2_id: number;
			timezone: string;
			population?: number;
			country_id: number;
			country: string;
			admin1: string;
			admin2: string;
			admin3?: string; 
			postcodes?: string[]; 
		}
	
		interface SearchData {
			results: Result[];
			generationtime_ms: number;
		}

		interface Raindrop {
			left: string;
			bottom: string;
			animationDelay: string;
			animationDuration: string;
		  };
	}
}

export {};
