import { useQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import ThemeToggle from "./components/ThemeToggle";
import { TooltipProvider } from "./components/ui/tooltip";
import { getCoordinate } from "./features/weather/api/geocoding";
import AdditionalInfo from "./features/weather/components/cards/AdditionalInfo";
import CurrentForecast from "./features/weather/components/cards/CurrentForecast";
import DailyForecast from "./features/weather/components/cards/DailyForecast";
import HourlyForecast from "./features/weather/components/cards/HourlyForecast";
import LocationDropdown from "./features/weather/components/dropdowns/LocationDropdown";
import type { MapType } from "./features/weather/components/dropdowns/MapTypeDropdown";
import MapTypeDropdown from "./features/weather/components/dropdowns/MapTypeDropdown";
import Map from "./features/weather/components/Map";
import MapLegend from "./features/weather/components/MapLegend";
import SideBar from "./features/weather/components/SideBar";
import CurrentSkeletons from "./features/weather/components/skeletons/CurrentSkeletons";
import DailySkeletons from "./features/weather/components/skeletons/DailySkeletons";
import type { Coord } from "./features/weather/coord";

function App() {
  const [coordinates, setCoord] = useState<Coord>({ lat: 35.67, lng: 139.65 });
  const [mode, setMode] = useState<"map" | "geocode">("map");
  const [city, setCity] = useState<string>("Tokyo");
  const [mapType, selectMapType] = useState<MapType>("none");

  const mapClick = (lat: number, lng: number) => {
    setCoord({ lat, lng });
    setMode("map");
  };

  const selectLocation = (city: string) => {
    setCity(city);
    setMode("geocode");
  };

  const { data: geocoding } = useQuery({
    queryKey: ["geocode", city],
    queryFn: () => getCoordinate(city),
    enabled: mode === "geocode",
  });

  const coord =
    mode === "map"
      ? coordinates
      : geocoding
        ? { lat: geocoding[0].lat, lng: geocoding[0].lon }
        : coordinates; //fallback to coordinate if geocoding not available

  const shouldShowLegend = mapType !== "none";

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-3 px-6 py-3 w-[calc(100dvw-var(--sidebar-width))] h-screen overflow-hidden">
        <div className="flex items-center gap-4 px-3 py-1 rounded-lg bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">
              Location
            </span>
            <LocationDropdown city={city} onSelectLocation={selectLocation} />
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">
              Map Type
            </span>
            <MapTypeDropdown
              mapType={mapType}
              onSelectMapType={selectMapType}
            />
          </div>
          <ThemeToggle />
        </div>
        <div className="grid flex-1 min-h-0 grid-cols-4 grid-rows-[1fr_minmax(0,180px)_minmax(0,180px)] gap-4">
          <div className="relative col-span-4 min-h-0">
            <Map coord={coord} onMapClick={mapClick} mapType={mapType} />
            {shouldShowLegend && <MapLegend mapType={mapType} />}
          </div>
          <div className="col-span-1 row-span-2">
            <Suspense fallback={<CurrentSkeletons />}>
              <CurrentForecast coord={coord} />
            </Suspense>
          </div>
          <div className="col-span-2">
            <Suspense fallback={<CurrentSkeletons />}>
              <HourlyForecast coord={coord} />
            </Suspense>
          </div>
          <div className="col-span-1 row-span-2">
            <Suspense fallback={<DailySkeletons />}>
              <DailyForecast coord={coord} />
            </Suspense>
          </div>
          <div className="col-span-2">
            <Suspense fallback={<CurrentSkeletons />}>
              <AdditionalInfo coord={coord} />
            </Suspense>
          </div>
        </div>
      </div>
      <Suspense>
        <SideBar coord={coord} />
      </Suspense>
    </TooltipProvider>
  );
}

export default App;
