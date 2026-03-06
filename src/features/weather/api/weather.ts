import { WeatherResponseSchema } from "../schemas/weatherSchema";

export async function getWeather({ lat, lon }: { lat: number; lon: number }) {
  const result = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
  return WeatherResponseSchema.parse(await result.json());
}
