"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MomentGalleryProps {
  images: string[];
  title: string;
}

export function MomentGallery({ images, title }: MomentGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index: number) => {
    setActiveIndex((index + images.length) % images.length);
  };

  return (
    <div>
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#f0f0ec]">
        <Image
          src={images[activeIndex]}
          alt={`${title} - image ${activeIndex + 1}`}
          fill
          className="object-cover"
          priority
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous image"
              className="absolute top-1/2 left-3 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-0 bg-white/80 text-[#333] transition hover:bg-white"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next image"
              className="absolute top-1/2 right-3 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-0 bg-white/80 text-[#333] transition hover:bg-white"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute right-3 bottom-3 bg-black/55 px-2.5 py-1 font-['Raleway',sans-serif] text-[0.65rem] tracking-[0.08em] text-white">
              {activeIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image + index}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`View image ${index + 1}`}
              className={`relative h-16 w-20 shrink-0 cursor-pointer overflow-hidden border-0 p-0 transition ${
                index === activeIndex
                  ? "opacity-100 ring-2 ring-(--teal)"
                  : "opacity-60 hover:opacity-90"
              }`}
            >
              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
