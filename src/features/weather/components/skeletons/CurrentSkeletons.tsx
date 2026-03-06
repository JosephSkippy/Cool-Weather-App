import Card from "../cards/Card";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

export default function CurrentSkeletons({}: Props) {
  return (
    <Card title="Current Forecast">
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-6xl font-semibold text-center">
          <Skeleton className="h-15 w-42" />
        </h2>
        <Skeleton className="w-13 h-13" />
        <p className="text-gray-500/75 text-center">
          <Skeleton className="w-30 h-6" />
        </p>
        <Skeleton className="w-10 h-6" />
        <Skeleton className="w-9 h-6" />
        <div className="flex gap-2 justify-between w-full">
          <div className="flex flex-col items-center">
            <p className="text-gray-500">Humidity</p>
            <Skeleton className="w-9 h-6" />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-gray-500">Wind</p>
            <Skeleton className="w-9 h-6" />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-gray-500">Feels Like</p>
            <Skeleton className="w-9 h-6" />
          </div>
        </div>
      </div>
    </Card>
  );
}
