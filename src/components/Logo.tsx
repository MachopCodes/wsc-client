"use client";

import Image from "next/image";

export default function Logo() {
  return (
    <main
      className="flex items-center justify-center flex-col bg-cover bg-center bg-no-repeat min-h-screen px-6 py-12"
      style={{
        backgroundImage:
          "url('/barrels.jpg'), linear-gradient(to bottom, rgba(0, 0, 0, 0) 75%, rgba(139, 69, 19, 0.8) 100%)",
        backgroundBlendMode: "normal",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 75%, transparent 100%)",
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
        At W&S Craft Connections, we carry exceptional wines and spirits from
        around the world and our passion is rooted in forging meaningful
        connections—linking people to the finest varietals, blending cultures
        through shared flavors, and celebrating craftsmanship with those who
        value it most. From rare vintages to artisanal spirits, we bring the
        world&apos;s best to your table, one extraordinary bottle at a time.
      </p>
    </main>
  );
}
