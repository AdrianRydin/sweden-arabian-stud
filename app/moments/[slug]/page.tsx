import Link from "next/link";
import { notFound } from "next/navigation";
import { dbConnect } from "../../lib/mongodb";
import { Moment as MomentModel } from "../../models/Moment";
import { MomentGallery } from "../../components/MomentGallery";

export const dynamic = "force-dynamic";

type LeanMoment = {
  _id: unknown;
  title?: string;
  description?: string;
  images?: string[];
  slug?: string;
};

interface MomentDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getMomentBySlug(slug: string) {
  await dbConnect();

  const moment = (await MomentModel.findOne({
    slug,
    isVisible: true,
  }).lean()) as LeanMoment | null;

  if (!moment) {
    return null;
  }

  return {
    _id: String(moment._id),
    title: moment.title || "",
    description: moment.description || "",
    images: moment.images || [],
    slug: moment.slug || "",
  };
}

export default async function MomentDetailPage({
  params,
}: MomentDetailPageProps) {
  const { slug } = await params;
  const moment = await getMomentBySlug(slug);

  if (!moment) {
    notFound();
  }

  return (
    <section className="bg-white px-[clamp(20px,6vw,80px)] py-[clamp(32px,5vw,60px)] pb-[clamp(40px,6vw,80px)]">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/moments"
          className="mb-6 inline-block font-['Raleway',sans-serif] text-[0.68rem] tracking-[0.14em] text-(--teal) uppercase no-underline"
        >
          Back to moments
        </Link>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-10">
          <MomentGallery images={moment.images} title={moment.title} />

          <div>
            <h1 className="mb-6 font-['Cormorant_Garamond',serif] text-4xl text-[#333] md:text-5xl">
              {moment.title}
            </h1>

            <p className="whitespace-pre-line font-['Raleway',sans-serif] text-[0.82rem] leading-7 text-(--text-secondary)">
              {moment.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
