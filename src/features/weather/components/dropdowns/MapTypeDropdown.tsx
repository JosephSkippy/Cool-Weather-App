import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  mapType: MapType;
  onSelectMapType: (mapType: MapType) => void;
};

export default function MapTypeDropdown({ mapType, onSelectMapType }: Props) {
  return (
    <Select value={mapType} onValueChange={onSelectMapType}>
      <SelectTrigger size="sm" className="w-40">
        <SelectValue placeholder="Map Type" />
      </SelectTrigger>
      <SelectContent className="z-1001">
        <SelectGroup>
          {MAP_TYPES.map((types) => (
            <SelectItem key={types.value} value={types.value}>
              {types.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export const MAP_TYPES = [
  { value: "none", label: "None" },
  { value: "temp_new", label: "Temperature" },
  { value: "wind_new", label: "Wind" },
  { value: "pressure_new", label: "Pressure" },
  { value: "precipitation_new", label: "Precipitation" },
  { value: "clouds_new", label: "Clouds" },
] as const;

export type MapType = (typeof MAP_TYPES)[number]["value"];
