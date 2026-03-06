import { type ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  title?: string;
};

export default function Card({ children, title }: CardProps) {
  return (
    <div className="p-4 rounded-xl bg-linear-to-br from-card to-card/60 shadow-md">
      <h2 className="font-semibold text-2xl"> {title}</h2>
      <div>{children}</div>
    </div>
  );
}
