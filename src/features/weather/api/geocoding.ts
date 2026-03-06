import { LocationSchema } from "../schemas/geocodingSchema";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function getCoordinate(city: string) {
  const result = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`,
  );

  return LocationSchema.parse(await result.json());
}
