import { LocationSchema } from "../schemas/geocodingSchema";

export async function getCoordinate(city: string) {
  const result = await fetch(`/api/geocoding?q=${city}`);

  return LocationSchema.parse(await result.json());
}
