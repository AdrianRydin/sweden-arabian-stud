import Image from "next/image";
import { TornEdge } from "./TornEdge";

interface PageHeroProps {
  title: string;
  backgroundImage: string;
}

export function PageHero({ title, backgroundImage }: PageHeroProps) {
  return (
    <div className="relative">
      <div className="w-full h-[clamp(200px,30vw,360px)] relative overflow-hidden">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover object-[center_30%] brightness-[0.45] grayscale-[0.3]"
        />

        <div className="absolute inset-0 bg-linear-to-b from-[rgba(50,50,50,0.3)] via-[rgba(50,50,50,0.15)] via-60% to-[rgba(50,50,50,0.5)]" />

        <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
          <h1 className="font-['Cormorant_SC', serif] text-[clamp(1.8rem,5vw,3.5rem)] text-white/95 tracking-[0.25em] leading-none m-0 uppercase">
            {title}
          </h1>

          <div className="flex items-center gap-3 w-[clamp(200px,40vw,300px)]">
            <div className="flex-1 h-px bg-linear-to-r from-transparent to-(--sage-light)" />
            <div className="w-2 h-2 rounded-full bg-(--sage) shadow-[0_0_12px_rgba(139,157,131,0.6)]" />
            <div className="flex-1 h-px bg-linear-to-l from-transparent to-(--sage-light)" />
          </div>
        </div>
      </div>
      <TornEdge color="#ffffff" />
    </div>
  );
}
