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

export default function DailyForecast({ coord }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coord.lat, coord.lng],
    queryFn: () => getWeather(mapToWeather(coord)),
  });

  return (
    <Card title="Daily Weather">
      <div className="flex flex-col gap-4">
        {data?.daily.map((day) => (
          <div
            key={day.dt}
            className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] items-center gap-4"
          >
            <p>
              {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                weekday: "short",
              })}
            </p>
            <WeatherIcon img={day.weather[0].icon} />
            <p>{Math.round(day.temp.day)}°C</p>
            <p className="text-gray-500/75">{Math.round(day.temp.min)}°C</p>
            <p className="text-gray-500/75">{Math.round(day.temp.max)}°C</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
