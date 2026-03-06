import Card from "../cards/Card";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

export default function DailySkeletons({}: Props) {
  return (
    <Card title="Daily Weather">
      <div className="flex flex-col gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] items-center gap-4"
          >
            <Skeleton className="w-9 h-8" />
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
          </div>
        ))}
      </div>
    </Card>
  );
}
