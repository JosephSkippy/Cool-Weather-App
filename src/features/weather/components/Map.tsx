import "@maptiler/leaflet-maptilersdk";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import type { LeafletMouseEvent } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import type { Coord } from "../coord";
import type { MapType } from "./dropdowns/MapTypeDropdown";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const zoomLevel = 5;
const MAPTILES_API_KEY = import.meta.env.VITE_MAPTILES_API_KEY;

type Props = {
  coord: Coord;
  onMapClick: (lat: number, lng: number) => void;
  mapType: MapType;
};

export default function Map({ coord, onMapClick, mapType }: Props) {
  return (
    <MapContainer
      center={coord}
      zoom={zoomLevel}
      style={{ height: "100%", width: "100%" }}
    >
      <MapClick onMapClick={onMapClick} />
      <MapPanToCoord coord={coord} />
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
      <MapTiles />
      <TileLayer
        opacity={0.7}
        url={`https://tile.openweathermap.org/map/${mapType}/${zoomLevel}/{x}/{y}.png?appid=${API_KEY}`}
      />
      <Marker position={coord}></Marker>
    </MapContainer>
  );
}

type MapProps = {
  onMapClick: (lat: number, lng: number) => void;
};

function MapClick({ onMapClick }: MapProps) {
  const map = useMap();

  function handleClick(e: LeafletMouseEvent) {
    const { lat, lng } = e.latlng;
    onMapClick(lat, lng);
  }

  useEffect(() => {
    map.on("click", handleClick);
    return () => {
      map.off("click", handleClick);
    };
  }, [map, onMapClick]);
  return null;
}

function MapPanToCoord({ coord }: { coord: Coord }) {
  const map = useMap();

  useEffect(() => {
    map.panTo([coord.lat, coord.lng]);
  }, [map, coord.lat, coord.lng]);

  return null;
}

function useTheme() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return dark;
}

function MapTiles() {
  const map = useMap();
  const dark = useTheme();

  useEffect(() => {
    const mtLayer = new MaptilerLayer({
      style: dark ? "basic-dark" : "basic-v2",
      apiKey: MAPTILES_API_KEY,
    });
    mtLayer.addTo(map);

    return () => {
      map.removeLayer(mtLayer);
    };
  }, [map, dark]);

  return null;
}
