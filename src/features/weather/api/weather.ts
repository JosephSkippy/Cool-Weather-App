import { WeatherResponseSchema } from "../schemas/weatherSchema";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function getWeather({ lat, lon }: { lat: number; lon: number }) {
  const result = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${API_KEY}`,
  );
  return WeatherResponseSchema.parse(await result.json());
}
