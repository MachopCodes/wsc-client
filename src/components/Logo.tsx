"use client";

import Image from "next/image";

export default function Logo() {
  return (
    <main
      className="flex items-center justify-center flex-col bg-cover bg-center bg-no-repeat min-h-screen px-6 py-12"
      style={{
        backgroundImage: "url('/barrels.jpg'), linear-gradient(to bottom, rgba(0, 0, 0, 0) 75%, rgba(139, 69, 19, 0.8) 100%)",
        backgroundBlendMode: "normal",
        WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    >
      <div className="relative w-full max-w-md aspect-[8/3]">
        <Image
          src="/logo.png"
          alt="Logo"
          fill
          className="rounded object-contain"
          priority
        />
      </div>
      <p className="mt-4 text-center max-w-2xl text-white drop-shadow-lg">
        At W&S Craft Connections, we bridge the gap between exceptional wines
        and spirits from around the globe and those who appreciate the art of
        fine beverages. Our passion lies in creating meaningful
        connections—connecting people to the finest varietals, connecting
        cultures through shared flavors, and connecting craftsmanship with those
        who value it most. Whether it&apos;s rare vintages or artisanal spirits,
        we bring the world&apos;s best to your table, one bottle at a time.
      </p>
    </main>
  );
}
