import { ReactNode } from "react";
import React from 'react';
import { cn } from "@next360/utils";

export default function AnimatedGradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-white/40 px-4 py-1.5 text-sm font-bold shadow-[inset_0_-8px_10px_#8fd14f1f] backdrop-blur-sm transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fd14f3f]",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-primary via-[#7cb342] to-primary bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] z-0",
        )}
      />

      <span className="relative z-10">{children}</span>
    </div>
  );
}
