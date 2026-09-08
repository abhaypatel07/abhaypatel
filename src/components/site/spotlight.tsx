import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Spotlight({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div onMouseMove={onMove} className={cn("spotlight", className)}>
      {children}
    </div>
  );
}
