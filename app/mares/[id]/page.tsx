import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mares } from "../../data/catalogData";

interface MareDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MareDetailPage({ params }: MareDetailPageProps) {
  const { id } = await params;
  const mare = mares.find((item) => item.id === id);

  if (!mare) {
    notFound();
  }

  return (
    <section className="bg-white px-[clamp(20px,6vw,80px)] py-[clamp(32px,5vw,60px)] pb-[clamp(40px,6vw,80px)]">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/mares"
          className="inline-block font-['Raleway',sans-serif] text-[0.68rem] tracking-[0.14em] uppercase text-(--teal) no-underline mb-6"
        >
          Back to mares
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
          <div className="relative w-full aspect-4/3 overflow-hidden">
            <Image
              src={mare.image}
              alt={mare.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h1 className="font-['Cormorant_Garamond',serif] text-4xl md:text-5xl text-[#333] mb-2">
              {mare.name}
            </h1>
            <p className="font-['Raleway',sans-serif] text-[0.68rem] tracking-[0.12em] uppercase text-(--sage) mb-6">
              Mare
            </p>

            <div className="mb-6">
              <div className="font-['Raleway',sans-serif] text-[0.62rem] tracking-[0.12em] uppercase text-(--text-muted) mb-1">
                Parentage
              </div>
              <div className="font-['Cormorant_Garamond',serif] text-xl text-[#333]">
                {mare.parentage}
              </div>
            </div>

            <p className="font-['Raleway',sans-serif] text-[0.82rem] leading-7 text-(--text-secondary)">
              {mare.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
