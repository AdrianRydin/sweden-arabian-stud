import { PageHero } from "../components/PageHero";
import { MomentCard } from "../components/MomentCard";
import { dbConnect } from "../lib/mongodb";
import { Moment as MomentModel } from "../models/Moment";

export const dynamic = "force-dynamic";

const heroImage = "/image0.jpeg";

type LeanMoment = {
  _id: unknown;
  title?: string;
  images?: string[];
  slug?: string;
};

async function getMoments() {
  await dbConnect();

  const moments = (await MomentModel.find({ isVisible: true })
    .sort({ createdAt: -1 })
    .lean()) as LeanMoment[];

  return moments.map((moment) => ({
    _id: String(moment._id),
    title: moment.title || "",
    image: moment.images?.[0] || "",
    slug: moment.slug || "",
  }));
}

async function MomentsPage() {
  const moments = await getMoments();

  return (
    <div>
      <PageHero title="Moments" backgroundImage={heroImage} />

      <div className="bg-white px-[clamp(20px,6vw,80px)] py-[clamp(32px,5vw,60px)] pb-[clamp(40px,6vw,80px)]">
        <div className="mb-12 text-center">
          <div className="mb-2.5 font-['Raleway',sans-serif] text-[0.65rem] tracking-[0.22em] text-[#5b9aaf] uppercase">
            Our Moments
          </div>

          <p className="mx-auto my-0 max-w-120 font-['Cormorant_Garamond',serif] text-[0.95rem] leading-[1.9] text-[#888] italic">
            A collection of memories, milestones and unforgettable moments from
            Sweden Arabian Stud — captured through the years, both in the show
            ring and at home.
          </p>
        </div>

        {moments.length === 0 ? (
          <div className="mx-auto max-w-2xl border border-[#e8e8e4] p-8 text-center">
            <p className="m-0 font-['Raleway',sans-serif] text-[0.75rem] leading-loose tracking-[0.06em] text-[#888]">
              No moments have been shared yet.
            </p>
          </div>
        ) : (
          <div className="moments-grid">
            {moments.map((moment) => (
              <MomentCard
                key={moment._id}
                image={moment.image}
                title={moment.title}
                detailLink={moment.slug ? `/moments/${moment.slug}` : undefined}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .moments-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px 32px;
        }

        @media (max-width: 900px) {
          .moments-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 560px) {
          .moments-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default MomentsPage;
