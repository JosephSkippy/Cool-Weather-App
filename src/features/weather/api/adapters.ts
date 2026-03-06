import type { Coord } from "../coord";

export function mapToWeather(coord: Coord) {
  return { lat: coord.lat, lon: coord.lng };
}
