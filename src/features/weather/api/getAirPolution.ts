import { AirPollutionSchema } from "../schemas/airPollutionSchema";

export async function getAirPolution({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) {
  const result = await fetch(`/api/air-pollution?lat=${lat}&lon=${lon}`);

  const json = await result.json();

  return AirPollutionSchema.parse(json);
}
