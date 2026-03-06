import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  city: string;
  onSelectLocation: (location: string) => void;
};

export default function LocationDropdown({ city, onSelectLocation }: Props) {
  return (
    <Select value={city} onValueChange={onSelectLocation}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent className="z-1001">
        <SelectGroup>
          {cities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

const cities = [
  "Tokyo",
  "Singapore",
  "Paris",
  "London",
  "New York City",
  "Dubai",
  "Bangkok",
  "Rome",
  "Barcelona",
  "Los Angeles",
];
