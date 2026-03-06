import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  title?: string;
  className?: string;
  childrenClassName?: string;
};

export default function Card({
  children,
  title,
  className,
  childrenClassName,
}: CardProps) {
  return (
    <div
      className={cn(
        "p-3 rounded-xl bg-linear-to-br from-card to-card/60 shadow-md flex flex-col gap-2 h-full border dark:border-none overflow-hidden",
        className,
      )}
    >
      {title && <h2 className="text-lg font-semibold">{title}</h2>}
      <div
        className={cn(
          "animate-[fade-in_1s_ease-out_forwards] flex-1 min-h-0 overflow-hidden",
          childrenClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
