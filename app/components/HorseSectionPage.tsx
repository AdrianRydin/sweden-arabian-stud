import { ReactNode } from "react";
import { PageHero } from "./PageHero";
import { HorseCard } from "./HorseCard";
import { dbConnect } from "../lib/mongodb";
import { Horse as HorseModel } from "../models/Horse";
import { HorseSection } from "../data/horseData";

type LeanHorse = {
  _id: unknown;
  name?: string;
  birthYear?: number;
  image?: string;
  sire?: string;
  dam?: string;
  slug?: string;
  section?: HorseSection;
  status?: "available" | "sold";
  price?: string;
};

interface HorseSectionPageProps {
  section: HorseSection;
  title: string;
  heroImage: string;
  eyebrow?: string;
  introText?: string;
  showBirthYear?: boolean;
  showPrice?: boolean;
  emptyMessage?: string;
  children?: ReactNode;
}

async function getHorsesBySection(section: HorseSection) {
  await dbConnect();

  const horses = (await HorseModel.find({
    section,
    isVisible: true,
  })
    .sort({ createdAt: -1 })
    .lean()) as LeanHorse[];

  return horses.map((horse) => ({
    _id: String(horse._id),
    name: horse.name || "",
    birthYear: horse.birthYear,
    image: horse.image || "",
    sire: horse.sire || "",
    dam: horse.dam || "",
    slug: horse.slug || "",
    section: horse.section,
    status: horse.status || "available",
    price: horse.price || "",
  }));
}

export async function HorseSectionPage({
  section,
  title,
  heroImage,
  eyebrow,
  introText,
  showBirthYear = false,
  showPrice = false,
  emptyMessage = "No horses are currently available in this section.",
  children,
}: HorseSectionPageProps) {
  const horses = await getHorsesBySection(section);

  return (
    <div>
      <PageHero title={title} backgroundImage={heroImage} />

      <div className="bg-white px-[clamp(20px,6vw,80px)] py-[clamp(32px,5vw,60px)] pb-[clamp(40px,6vw,80px)]">
        {(eyebrow || introText) && (
          <div className="mb-12 text-center">
            {eyebrow && (
              <div className="mb-2.5 font-['Raleway',sans-serif] text-[0.65rem] tracking-[0.22em] text-[#5b9aaf] uppercase">
                {eyebrow}
              </div>
            )}

            {introText && (
              <p className="mx-auto my-0 max-w-120 font-['Cormorant_Garamond',serif] text-[0.95rem] leading-[1.9] text-[#888] italic">
                {introText}
              </p>
            )}
          </div>
        )}

        {horses.length === 0 ? (
          <div className="mx-auto max-w-2xl border border-[#e8e8e4] p-8 text-center">
            <p className="m-0 font-['Raleway',sans-serif] text-[0.75rem] leading-loose tracking-[0.06em] text-[#888]">
              {emptyMessage}
            </p>
          </div>
        ) : (
          <div className="horse-section-grid">
            {horses.map((horse) => {
              const parentage =
                horse.sire && horse.dam
                  ? `${horse.sire} × ${horse.dam}`
                  : undefined;

              const detailLink = horse.slug
                ? `/${section}/${horse.slug}`
                : undefined;

              return (
                <div key={horse._id}>
                  <HorseCard
                    image={horse.image}
                    name={horse.name}
                    parentage={parentage}
                    detailLink={detailLink}
                    badge={horse.status === "sold" ? "Sold" : undefined}
                    price={showPrice ? horse.price : undefined}
                  />

                  {showBirthYear && horse.birthYear && (
                    <div className="mt-1 text-center font-['Raleway',sans-serif] text-[0.6rem] tracking-widest text-[#aaa] uppercase">
                      {horse.birthYear}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {children}
      </div>

      <style>{`
        .horse-section-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px 32px;
        }

        @media (max-width: 900px) {
          .horse-section-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 560px) {
          .horse-section-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
