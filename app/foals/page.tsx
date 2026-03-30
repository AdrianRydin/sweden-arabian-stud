import { PageHero } from "../components/PageHero";
import { HorseCard } from "../components/HorseCard";

const heroImage =
  "https://images.unsplash.com/photo-1691567951778-c01762eb13cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBcmFiaWFuJTIwaG9yc2UlMjBmb2FsJTIweW91bmd8ZW58MXx8fHwxNzcyODEwNTU1fDA&ixlib=rb-4.1.0&q=80&w=1080";

const foals = [
  {
    id: 1,
    name: "Odin SAS 2025",
    parentage: "Norrsken SAS × Aurora SAS",
    year: "Colt · 2025",
    image:
      "https://images.unsplash.com/photo-1691567951778-c01762eb13cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBcmFiaWFuJTIwaG9yc2UlMjBmb2FsJTIweW91bmd8ZW58MXx8fHwxNzcyODEwNTU1fDA&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    id: 2,
    name: "Embla SAS 2025",
    parentage: "Viking Star SAS × Isadora SAS",
    year: "Filly · 2025",
    image:
      "https://images.unsplash.com/photo-1733065122105-8f6bd5886857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBcmFiaWFuJTIwaG9yc2UlMjBwb3J0cmFpdCUyMHByb2ZpbGV8ZW58MXx8fHwxNzcyODEwNTQ5fDA&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    id: 3,
    name: "Thor SAS 2025",
    parentage: "Norrsken SAS × Saga Arabica",
    year: "Colt · 2025",
    image:
      "https://images.unsplash.com/photo-1617745021057-ca21f1be34a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmV5JTIwQXJhYmlhbiUyMG1hcmUlMjBwYXN0dXJlfGVufDF8fHx8MTc3MjgxMDU1NXww&ixlib=rb-4.1.0&q=80&w=400",
  },
];

function Foals() {
  return (
    <div>
      <PageHero title="Foals" backgroundImage={heroImage} />

      <div className="bg-white px-[clamp(20px,6vw,80px)] py-[clamp(32px,5vw,60px)] pb-[clamp(40px,6vw,80px)]">
        <div className="text-center mb-12">
          <div className="font-['Raleway',sans-serif] text-[0.65rem] tracking-[0.22em] text-[#5b9aaf] mb-2.5 uppercase">
            Class of 2025
          </div>
          <p className="font-['Cormorant_Garamond',serif] italic text-[0.95rem] text-[#888] max-w-[480px] mx-auto my-0 leading-[1.9]">
            Every foal born at Sweden Arabian Stud carries the promise of
            greatness. Bred from our finest bloodlines, they are the future of
            our programme.
          </p>
        </div>

        <div className="horse-grid-foals">
          {foals.map((foal) => (
            <div key={foal.id}>
              <HorseCard
                image={foal.image}
                name={foal.name}
                parentage={foal.parentage}
              />
              <div className="text-center font-['Raleway', sans-serif] text-[0.6rem] text-[#aaa] tracking-widest mt-1 uppercase">
                {foal.year}
              </div>
            </div>
          ))}
        </div>

        <div className="my-14 text-center p-8 border border-[#e8e8e4]">
          <div className="font-['Cormorant_SC', serif] text-base text-[#444] tracking-widest mb-2">
            2026 Breeding Season
          </div>
          <p className="font-['Raleway',sans-serif] text-[0.7rem] text-[#888] leading-loose m-0">
            We are currently planning our 2026 breeding season. If you are
            interested in a foal from a specific pairing, please{" "}
            <a href="/contact" className="text-[#5b9aaf] no-underline">
              contact us
            </a>{" "}
            to discuss possibilities.
          </p>
        </div>
      </div>
      <style>{`
        .horse-grid-foals {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px 32px;
        }
        @media (max-width: 900px) {
          .horse-grid-foals {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 560px) {
          .horse-grid-foals {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default Foals;
