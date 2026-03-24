"use client";
import { useEffect, useState } from "react";
import { PageHero } from "../components/PageHero";
import { HorseCard } from "../components/HorseCard";
import { getHorses, Horse } from "../data/horseData";

const heroImage =
  "https://images.unsplash.com/photo-1721233864500-3c79767d41cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYmF5JTIwc3RhbGxpb24lMjBBcmFiaWFuJTIwaG9yc2V8ZW58MXx8fHwxNzcyODEwNTU5fDA&ixlib=rb-4.1.0&q=80&w=1080";

function StallionPage() {
  const [stallions, setStallions] = useState<Horse[]>([]);

  useEffect(() => {
    const allHorses = getHorses();
    const stallionList = Object.values(allHorses).filter(
      (horse) => horse.category === "Stallion",
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStallions(stallionList);
  }, []);
  return (
    <div>
      <PageHero title="Stallions" backgroundImage={heroImage} />

      <div className="bg-white px-[clamp(20px,6vw,80px)] py-[clamp(32px,5vw,60px)] pb-[clamp(40px,6vw,80px)]">
        <div className="text-center mb-12">
          <div className="font-['Raleway',sans-serif] text-[0.65em] tracking-[0.22em] text-(--sage) mb-2.5 uppercase">
            Our Stallions
          </div>
          <p className="font-['Cormorant_Garamond',serif] italic text-[0.95em] text-(--text-muted) max-w-120 mx-auto my-0 leading-[1.9]">
            Our stallions represent the finest in Arabian breeding — each chosen
            for his exceptional conformation, movement, and noble character.
          </p>
        </div>

        <div className="horse-grid-3">
          {stallions.map((stallions) => (
            <HorseCard
              key={stallions.id}
              image={stallions.image}
              name={stallions.name}
              parentage={`${stallions.sire} x ${stallions.dam}`}
              detailLink={`/horse/${stallions.id}`}
            />
          ))}
        </div>

        <div className="mt-16 px-10 py-9 bg-(--beige-light) border-l-[3px] border-(--sage)">
          <div className="font-['Cormorant_SC',serif] text-base text-[#444] tracking-widest mb-2.5">
            Breeding Services
          </div>
          <p className="font-['Raleway',sans-serif] text-[0.72rem] text-(--text-secondary) leading-loose m-0">
            All our stallions are available for breeding services, both live
            cover and chilled semen. For breeding inquiries, please contact us
            at{" "}
            <a
              href="mailto:kathleen@swedenarabianstud.com"
              className="text-(--teal) no-underline"
            >
              kathleen@swedenarabianstud.com
            </a>
            . We welcome mares of all ages and backgrounds that meet our quality
            standards.
          </p>
        </div>
      </div>
      <style>{`
        .horse-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px 32px;
        }
        @media (max-width: 900px) {
          .horse-grid-3 {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 560px) {
          .horse-grid-3 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default StallionPage;
