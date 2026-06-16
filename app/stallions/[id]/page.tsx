"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getHorses, Horse } from "../../data/horseData";

function StallionDetailPage() {
  const params = useParams<{ id: string }>();
  const [horse, setHorse] = useState<Horse | null>(null);

  useEffect(() => {
    const horseId = params?.id;
    if (!horseId) return;

    const allHorses = getHorses();
    const selectedHorse = allHorses[horseId] ?? null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHorse(selectedHorse);
  }, [params]);

  if (!horse) {
    return (
      <section className="px-[clamp(20px,6vw,80px)] py-[clamp(40px,7vw,80px)] bg-white min-h-[60vh]">
        <h1 className="font-['Cormorant_Garamond',serif] text-4xl text-[#333] mb-4">
          Horse not found
        </h1>
        <p className="font-['Raleway',sans-serif] text-sm text-[#666] leading-relaxed mb-6 max-w-2xl">
          We could not find a stallion with that id.
        </p>
        <Link
          href="/stallions"
          className="font-['Raleway',sans-serif] text-[0.75rem] tracking-[0.12em] uppercase text-(--teal) no-underline"
        >
          Back to stallions
        </Link>
      </section>
    );
  }

  return (
    <section className="bg-white px-[clamp(20px,6vw,80px)] py-[clamp(32px,5vw,60px)] pb-[clamp(40px,6vw,80px)]">
      <div className="max-w-5xl mx-auto">
        <Link
          href={horse.backLink || "/stallions"}
          className="inline-block font-['Raleway',sans-serif] text-[0.68rem] tracking-[0.14em] uppercase text-(--teal) no-underline mb-6"
        >
          Back to stallions
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
          <div className="relative w-full aspect-4/3 overflow-hidden">
            <Image
              src={horse.image}
              alt={horse.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h1 className="font-['Cormorant_Garamond',serif] text-4xl md:text-5xl text-[#333] mb-2">
              {horse.name}
            </h1>
            <p className="font-['Raleway',sans-serif] text-[0.68rem] tracking-[0.12em] uppercase text-(--sage) mb-6">
              {horse.birthYear} Stallion
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <div className="font-['Raleway',sans-serif] text-[0.62rem] tracking-[0.12em] uppercase text-(--text-muted) mb-1">
                  Sire
                </div>
                <div className="font-['Cormorant_Garamond',serif] text-xl text-[#333]">
                  {horse.sire}
                </div>
              </div>
              <div>
                <div className="font-['Raleway',sans-serif] text-[0.62rem] tracking-[0.12em] uppercase text-(--text-muted) mb-1">
                  Dam
                </div>
                <div className="font-['Cormorant_Garamond',serif] text-xl text-[#333]">
                  {horse.dam}
                </div>
              </div>
              <div>
                <div className="font-['Raleway',sans-serif] text-[0.62rem] tracking-[0.12em] uppercase text-(--text-muted) mb-1">
                  Owner
                </div>
                <div className="font-['Cormorant_Garamond',serif] text-xl text-[#333]">
                  {horse.owner}
                </div>
              </div>
              <div>
                <div className="font-['Raleway',sans-serif] text-[0.62rem] tracking-[0.12em] uppercase text-(--text-muted) mb-1">
                  Breeder
                </div>
                <div className="font-['Cormorant_Garamond',serif] text-xl text-[#333]">
                  {horse.breeder}
                </div>
              </div>
            </div>

            <p className="font-['Raleway',sans-serif] text-[0.82rem] leading-7 text-(--text-secondary)">
              {horse.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StallionDetailPage;
