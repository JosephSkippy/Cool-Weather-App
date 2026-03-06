import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSuspenseQuery } from "@tanstack/react-query";
import { mapToWeather } from "../../api/adapters";
import { getWeather } from "../../api/weather";
import type { Coord } from "../../coord";
import Card from "./Card";
import WeatherIcon from "./WeatherIcon";

type Props = {
  coord: Coord;
};

export default function HourlyForecast({ coord }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coord.lat, coord.lng],
    queryFn: () => getWeather(mapToWeather(coord)),
  });

  return (
    <Card title="Hourly Forecast (48 Hours)">
      <ScrollArea className="w-full">
        <div className="flex gap-6 pb-3">
          {data.hourly.map((hour) => (
            <div
              key={hour.dt}
              className="flex flex-col justify-between gap-2 items-center p-2"
            >
              <p className="whitespace-nowrap text-[10px]">
                {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
              <WeatherIcon img={hour.weather[0].icon} className="size-10" />
              <p className="text-[10px]">{Math.round(hour.temp)}°C</p>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Card>
  );
}
