import { AirPollutionSchema } from "../schemas/airPollutionSchema";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function getAirPolution({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) {
  const result = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
  );

  const json = await result.json();

  return AirPollutionSchema.parse(json);
}
