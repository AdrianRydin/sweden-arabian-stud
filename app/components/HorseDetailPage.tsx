import Link from "next/link";
import { notFound } from "next/navigation";
import { dbConnect } from "../lib/mongodb";
import { Horse as HorseModel } from "../models/Horse";
import {
  HorseSection,
  horseSectionBackLinks,
  horseSectionLabels,
  horseSectionPluralLabels,
} from "../data/horseData";
import { ImageGallery } from "./ImageGallery";

type LeanHorse = {
  _id: unknown;
  name?: string;
  birthYear?: number;
  breed?: string;
  description?: string;
  image?: string;
  images?: string[];
  owner?: string;
  breeder?: string;
  sire?: string;
  dam?: string;
  slug?: string;
  section?: HorseSection;
  status?: "available" | "sold";
  price?: string;
  pedigree?: unknown;
};

interface HorseDetailPageProps {
  section: HorseSection;
  slug: string;
}

async function getHorseBySlug(section: HorseSection, slug: string) {
  await dbConnect();

  const horse = (await HorseModel.findOne({
    section,
    slug,
    isVisible: true,
  }).lean()) as LeanHorse | null;

  if (!horse) {
    return null;
  }

  return {
    _id: String(horse._id),
    name: horse.name || "",
    birthYear: horse.birthYear,
    breed: horse.breed || "",
    description: horse.description || "",
    images: horse.images?.length
      ? horse.images
      : horse.image
        ? [horse.image]
        : [],
    owner: horse.owner || "",
    breeder: horse.breeder || "",
    sire: horse.sire || "",
    dam: horse.dam || "",
    slug: horse.slug || "",
    section: horse.section,
    status: horse.status || "available",
    price: horse.price || "",
  };
}

export async function HorseDetailPage({ section, slug }: HorseDetailPageProps) {
  const horse = await getHorseBySlug(section, slug);

  if (!horse) {
    notFound();
  }

  const parentage =
    horse.sire && horse.dam ? `${horse.sire} × ${horse.dam}` : "";

  return (
    <section className="bg-white px-[clamp(20px,6vw,80px)] py-[clamp(32px,5vw,60px)] pb-[clamp(40px,6vw,80px)]">
      <div className="mx-auto max-w-5xl">
        <Link
          href={horseSectionBackLinks[section]}
          className="mb-6 inline-block font-['Raleway',sans-serif] text-[0.68rem] tracking-[0.14em] text-(--teal) uppercase no-underline"
        >
          Back to {horseSectionPluralLabels[section].toLowerCase()}
        </Link>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-10">
          <ImageGallery images={horse.images} alt={horse.name} />

          <div>
            <div className="mb-2 font-['Raleway',sans-serif] text-[0.65rem] tracking-[0.16em] text-[#5b9aaf] uppercase">
              {horseSectionLabels[section]}
            </div>

            <h1 className="mb-2 font-['Cormorant_Garamond',serif] text-4xl text-[#333] md:text-5xl">
              {horse.name}
            </h1>

            {horse.birthYear && (
              <p className="mb-6 font-['Raleway',sans-serif] text-[0.68rem] tracking-[0.12em] text-(--sage) uppercase">
                {horse.birthYear}
              </p>
            )}

            {horse.status === "sold" && (
              <div className="mb-5 inline-block bg-(--sage) px-3 py-1 font-['Raleway',sans-serif] text-[0.62rem] tracking-[0.14em] text-white uppercase">
                Sold
              </div>
            )}

            {horse.price && (
              <div className="mb-6">
                <div className="mb-1 font-['Raleway',sans-serif] text-[0.62rem] tracking-[0.12em] text-(--text-muted) uppercase">
                  Price
                </div>
                <div className="font-['Cormorant_Garamond',serif] text-xl text-[#333]">
                  {horse.price}
                </div>
              </div>
            )}

            {parentage && (
              <div className="mb-6">
                <div className="mb-1 font-['Raleway',sans-serif] text-[0.62rem] tracking-[0.12em] text-(--text-muted) uppercase">
                  Parentage
                </div>
                <div className="font-['Cormorant_Garamond',serif] text-xl text-[#333]">
                  {parentage}
                </div>
              </div>
            )}

            {horse.breed && (
              <div className="mb-6">
                <div className="mb-1 font-['Raleway',sans-serif] text-[0.62rem] tracking-[0.12em] text-(--text-muted) uppercase">
                  Breed
                </div>
                <div className="font-['Cormorant_Garamond',serif] text-xl text-[#333]">
                  {horse.breed}
                </div>
              </div>
            )}

            <p className="font-['Raleway',sans-serif] text-[0.82rem] leading-7 text-(--text-secondary)">
              {horse.description}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 border-t border-[#e8e8e4] pt-6 sm:grid-cols-2">
              {horse.owner && (
                <div>
                  <div className="mb-1 font-['Raleway',sans-serif] text-[0.62rem] tracking-[0.12em] text-(--text-muted) uppercase">
                    Owner
                  </div>
                  <div className="font-['Cormorant_Garamond',serif] text-lg text-[#333]">
                    {horse.owner}
                  </div>
                </div>
              )}

              {horse.breeder && (
                <div>
                  <div className="mb-1 font-['Raleway',sans-serif] text-[0.62rem] tracking-[0.12em] text-(--text-muted) uppercase">
                    Breeder
                  </div>
                  <div className="font-['Cormorant_Garamond',serif] text-lg text-[#333]">
                    {horse.breeder}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
