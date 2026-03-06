import React from "react";
import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api/weather";
import WeatherIcon from "./WeatherIcon";
import type { Coord } from "../../coord";
import { mapToWeather } from "../../api/adapters";

type Props = {
  coord: Coord;
};

export default function CurrentForecast({ coord }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coord.lat, coord.lng],
    queryFn: () => getWeather(mapToWeather(coord)),
  });

  return (
    <Card title="Current Forecast">
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-6xl font-semibold text-center">
          {data.current.temp}°C
        </h2>
        <WeatherIcon img={data.current.weather[0].icon} className="size-14" />
        <p className="text-gray-500/75 text-center">
          {data.current.weather[0].description}
        </p>
        <h2>{new Date(data.current.dt * 1000).toLocaleTimeString()}</h2>
        <div className="flex gap-2 justify-between w-full">
          <div className="flex flex-col items-center">
            <p className="text-gray-500">Humidity</p>
            <p> {data.current.humidity}%</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-gray-500">Wind</p>
            <p>{data.current.wind_speed} m/s</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-gray-500">Feels Like</p>
            <p>{data.current.feels_like}°C</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
