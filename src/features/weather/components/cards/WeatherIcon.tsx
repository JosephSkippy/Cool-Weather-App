import clsx from "clsx";

type Props = {
  img: string;
  className?: string;
};

export default function WeatherIcon({ img, className }: Props) {
  return (
    <img
      className={clsx("size-8", className)}
      src={`http://openweathermap.org/img/wn/${img}.png`}
      alt="weather icon"
    />
  );
}
