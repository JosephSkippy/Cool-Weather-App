import { useSuspenseQuery } from "@tanstack/react-query";
import { mapToWeather } from "../../api/adapters";
import { getWeather } from "../../api/weather";
import type { Coord } from "../../coord";
import Card from "./Card";
import Cloud from "/src/features/weather/assets/cloud.svg?react";
import Pressure from "/src/features/weather/assets/pressure.svg?react";
import Sunrise from "/src/features/weather/assets/sunrise.svg?react";
import Sunset from "/src/features/weather/assets/sunset.svg?react";
import UpArrow from "/src/features/weather/assets/up-arrow.svg?react";
import UV from "/src/features/weather/assets/uv.svg?react";
import Wind from "/src/features/weather/assets/wind.svg?react";

type Props = {
  coord: Coord;
};

export default function AdditionalInfo({ coord }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coord.lat, coord.lng],
    queryFn: () => getWeather(mapToWeather(coord)),
  });

  return (
    <Card
      title="Additional Weather Info"
      childrenClassName="grid grid-cols-2 gap-3"
    >
      {rows.map(({ label, value, Icon }) => (
        <div className="flex justify-between" key={value}>
          <div className="flex gap-4 items-center">
            <span className="text-gray-500">{label}</span>
            <Icon className="size-8" />
          </div>
          <span>
            <FormatValue value={value} number={data.current[value]} />
          </span>
        </div>
      ))}
    </Card>
  );
}

function FormatValue({ value, number }: { value: string; number: number }) {
  if (value === "sunrise" || value === "sunset") {
    return new Date(number * 1000).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  if (value === "wind_deg") {
    return (
      <UpArrow
        className="w-8 h-8 invert"
        style={{ transform: `rotate(${number}deg)` }}
      />
    );
  }

  return number;
}

const rows = [
  {
    label: "Cloudiness (%)",
    value: "clouds",
    Icon: Cloud,
  },
  {
    label: "UV Index",
    value: "uvi",
    Icon: UV,
  },
  {
    label: "Wind Direction",
    value: "wind_deg",
    Icon: Wind,
  },
  {
    label: "Pressure (hPa)",
    value: "pressure",
    Icon: Pressure,
  },
  {
    label: "Sunrise",
    value: "sunrise",
    Icon: Sunrise,
  },
  {
    label: "Sunset",
    value: "sunset",
    Icon: Sunset,
  },
] as const;
