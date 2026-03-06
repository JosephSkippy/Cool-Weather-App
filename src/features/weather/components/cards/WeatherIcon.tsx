import clsx from "clsx";

type Props = {
  img: string;
  className?: string;
};

export default function WeatherIcon({ img, className }: Props) {
  return (
    <img
      className={clsx("size-8", className)}
      src={`https://openweathermap.org/img/wn/${img}@2x.png`}
      alt="weather icon"
    />
  );
}
