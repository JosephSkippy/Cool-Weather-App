import { useSuspenseQuery } from "@tanstack/react-query";
import { mapToWeather } from "../../api/adapters";
import { getWeather } from "../../api/weather";
import type { Coord } from "../../coord";
import Card from "./Card";
import WeatherIcon from "./WeatherIcon";

type Props = {
  coord: Coord;
};

export default function DailyForecast({ coord }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coord.lat, coord.lng],
    queryFn: () => getWeather(mapToWeather(coord)),
  });

  return (
    <Card
      title="Daily Forecast"
      childrenClassName="flex flex-col gap-0 justify-between"
    >
      {data?.daily.map((day) => (
        <div
          key={day.dt}
          className="flex justify-between items-center text-[10px]"
        >
          <p className="w-7">
            {new Date(day.dt * 1000).toLocaleDateString(undefined, {
              weekday: "short",
            })}
          </p>
          <WeatherIcon img={day.weather[0].icon} className="size-5" />
          <p>{Math.round(day.temp.day)}°C</p>
          <p className="text-gray-500/75">{Math.round(day.temp.min)}°C</p>
          <p className="text-gray-500/75">{Math.round(day.temp.max)}°C</p>
        </div>
      ))}
    </Card>
  );
}
