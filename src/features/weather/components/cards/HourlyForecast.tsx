import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api/weather";
import WeatherIcon from "./WeatherIcon";
import { mapToWeather } from "../../api/adapters";
import type { Coord } from "../../coord";

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
      <div className="overflow-x-hidden hover:overflow-x-auto">
        <div className="grid grid-cols-48 gap-8 min-w-max p-2">
          {data?.hourly.map((hour) => (
            <div key={hour.dt} className="flex flex-col items-center gap-2">
              <p>
                {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
                  hour: "2-digit",
                })}
              </p>
              <WeatherIcon img={hour.weather[0].icon} />
              <p>{hour.temp}°C</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
