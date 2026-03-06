import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api/weather";
import Sunrise from "/src/features/weather/assets/sunrise.svg?react";
import Cloud from "/src/features/weather/assets/cloud.svg?react";
import Pressure from "/src/features/weather/assets/pressure.svg?react";
import Sunset from "/src/features/weather/assets/sunset.svg?react";
import UV from "/src/features/weather/assets/uv.svg?react";
import Wind from "/src/features/weather/assets/wind.svg?react";
import UpArrow from "/src/features/weather/assets/up-arrow.svg?react";
import type { Coord } from "../../coord";
import { mapToWeather } from "../../api/adapters";

type Props = {
  coord: Coord;
};

export default function AdditionalInfo({ coord }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coord.lat, coord.lng],
    queryFn: () => getWeather(mapToWeather(coord)),
  });

  return (
    <Card title="Additional Info">
      <div className="flex flex-col gap-4">
        {rows.map(({ label, value, Icon }) => (
          <div key={value} className="flex justify-between">
            <div className=" flex gap-4 items-center">
              <span>{label}</span>
              <Icon className="w-5 h-5 invert" />
            </div>
            <span>
              <FormatValue value={value} number={data.current[value]} />
            </span>
          </div>
        ))}
      </div>
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
