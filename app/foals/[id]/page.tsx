import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { foals } from "../../data/catalogData";

interface FoalDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function FoalDetailPage({ params }: FoalDetailPageProps) {
  const { id } = await params;
  const foal = foals.find((item) => item.id === id);

  if (!foal) {
    notFound();
  }

  return (
    <section className="bg-white px-[clamp(20px,6vw,80px)] py-[clamp(32px,5vw,60px)] pb-[clamp(40px,6vw,80px)]">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/foals"
          className="inline-block font-['Raleway',sans-serif] text-[0.68rem] tracking-[0.14em] uppercase text-(--teal) no-underline mb-6"
        >
          Back to foals
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
          <div className="relative w-full aspect-4/3 overflow-hidden">
            <Image
              src={foal.image}
              alt={foal.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h1 className="font-['Cormorant_Garamond',serif] text-4xl md:text-5xl text-[#333] mb-2">
              {foal.name}
            </h1>
            <p className="font-['Raleway',sans-serif] text-[0.68rem] tracking-[0.12em] uppercase text-(--sage) mb-6">
              {foal.year}
            </p>

            <div className="mb-6">
              <div className="font-['Raleway',sans-serif] text-[0.62rem] tracking-[0.12em] uppercase text-(--text-muted) mb-1">
                Parentage
              </div>
              <div className="font-['Cormorant_Garamond',serif] text-xl text-[#333]">
                {foal.parentage}
              </div>
            </div>

            <p className="font-['Raleway',sans-serif] text-[0.82rem] leading-7 text-(--text-secondary)">
              {foal.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
