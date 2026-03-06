import { Suspense } from "react";
import { getAirPolution } from "../api/getAirPolution";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Coord } from "../coord";
import { mapToWeather } from "../api/adapters";
import Card from "./cards/Card";

type Props = {
  coord: Coord;
};

export default function SideBar({ coord }: Props) {
  return (
    <div className="fixed top-0 right-0 h-screen w-90 z-1001 bg-sidebar shadow-md py-4 px-4">
      <Suspense>
        <AirPollution coord={coord} />
      </Suspense>
    </div>
  );
}

function AirPollution({ coord }: { coord: Coord }) {
  console.log("adapter", coord);
  const { data } = useSuspenseQuery({
    queryKey: ["airpollution", coord],
    queryFn: () => getAirPolution(mapToWeather(coord)),
  });

  return (
    <Card>
      <div className="flex flex-col gap-3">
        {data["list"].map(unParseObject)}
      </div>
    </Card>
  );
}

function unParseObject(obj: Record<string, any>) {
  return Object.entries(obj["components"]).map(([key, value]) => {
    return (
      <div
        key={key}
        className="transition-transform hover:scale-105 duration-300 bg-linear-to-br from-sidebar-accent to-sidebar-accent/60"
      >
        <div className="flex justify-between">
          <span className="text-lg font-bold capitalize">{key}</span>
          <div className="text-lg font-bold capitalize">{String(value)}</div>
        </div>
      </div>
    );
  });
}
