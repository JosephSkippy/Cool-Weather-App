import { useSuspenseQuery } from "@tanstack/react-query";
import { mapToWeather } from "../../api/adapters";
import { getWeather } from "../../api/weather";
import type { Coord } from "../../coord";
import Card from "./Card";
import WeatherIcon from "./WeatherIcon";

type Props = {
  coord: Coord;
};

export default function CurrentForecast({ coord }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coord.lat, coord.lng],
    queryFn: () => getWeather(mapToWeather(coord)),
  });

  return (
    <Card
      title="Current Weather"
      childrenClassName="flex flex-col items-center gap-3 justify-between"
    >
      <div className="flex flex-col gap-1 items-center">
        <h2 className="text-4xl font-semibold text-center">
          {Math.round(data.current.temp)}°C
        </h2>
        <WeatherIcon img={data.current.weather[0].icon} className="size-10" />
        <h3 className="capitalize text-base">
          {data.current.weather[0].description}
        </h3>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-base text-center">Local Time:</p>
        <h3 className="text-2xl font-semibold">
          {new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: data.timezone,
          }).format(new Date(data.current.dt * 1000))}
        </h3>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col items-center gap-1">
          <p className="text-gray-500 text-xs">Feels Like</p>
          <p className="text-sm">{Math.round(data.current.feels_like)}°C</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-gray-500 text-xs">Humidity</p>
          <p className="text-sm">{data.current.humidity}%</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-gray-500 text-xs">Wind</p>
          <p className="text-sm">{data.current.wind_speed} m/s</p>
        </div>
      </div>
    </Card>
  );
}
