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
        "p-2 rounded-xl bg-card flex flex-col gap-0 h-full border border-border/30 dark:border-border/10 overflow-hidden",
        className,
      )}
    >
      {title && <h2 className="text-base font-semibold">{title}</h2>}
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
