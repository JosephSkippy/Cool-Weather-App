import DailyForecast from "./features/weather/components/cards/DailyForecast";
import HourlyForecast from "./features/weather/components/cards/HourlyForecast";
import CurrentForecast from "./features/weather/components/cards/CurrentForecast";
import AdditionalInfo from "./features/weather/components/cards/AdditionalInfo";
import Map from "./features/weather/components/Map";
import { useState, Suspense } from "react";
import type { Coord } from "./features/weather/coord";
import LocationDropdown from "./features/weather/components/dropdowns/LocationDropdown";
import { useQuery } from "@tanstack/react-query";
import { getCoordinate } from "./features/weather/api/geocoding";
import type { MapType } from "./features/weather/components/dropdowns/MapTypeDropdown";
import MapTypeDropdown from "./features/weather/components/dropdowns/MapTypeDropdown";
import MapLegend from "./features/weather/components/MapLegend";
import CurrentSkeletons from "./features/weather/components/skeletons/CurrentSkeletons";
import DailySkeletons from "./features/weather/components/skeletons/DailySkeletons";
import SideBar from "./features/weather/components/SideBar";

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
    <>
      <div className="flex flex-col gap-2">
        <LocationDropdown city={city} onSelectLocation={selectLocation} />
        <MapTypeDropdown mapType={mapType} onSelectMapType={selectMapType} />
        <div className="flex relative">
          <Map coord={coord} onMapClick={mapClick} mapType={mapType} />
          {shouldShowLegend && <MapLegend mapType={mapType} />}
        </div>
        <Suspense fallback={<CurrentSkeletons />}>
          <CurrentForecast coord={coord} />
        </Suspense>

        <Suspense fallback={<CurrentSkeletons />}>
          <HourlyForecast coord={coord} />
        </Suspense>
        <Suspense fallback={<DailySkeletons />}>
          <DailyForecast coord={coord} />
        </Suspense>
        <Suspense fallback={<CurrentSkeletons />}>
          <AdditionalInfo coord={coord} />
        </Suspense>
      </div>
      <Suspense>
        <SideBar coord={coord} />
      </Suspense>
    </>
  );
}

export default App;
