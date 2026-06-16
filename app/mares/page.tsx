import { PageHero } from "../components/PageHero";
import { HorseCard } from "../components/HorseCard";
import { mares } from "../data/catalogData";

const heroImage =
  "https://images.unsplash.com/photo-1758573951599-eb88f28f7297?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMEFyYWJpYW4lMjBob3JzZSUyMHNob3d8ZW58MXx8fHwxNzcyODEwNTUwfDA&ixlib=rb-4.1.0&q=80&w=1080";

function page() {
  return (
    <div>
      <PageHero title="Mares" backgroundImage={heroImage} />

      <div className="bg-white px-[clamp(20px,6vw,80px)] py-[clamp(32px,5vw,60px)] pb-[clamp(40vw,6vw,80px)]">
        <div className="text-center mb-12">
          <div className="text-[0.65rem] tracking-[0.22em] text-[#5b9aaf] mb-2.5 uppercase">
            Our Mares
          </div>
          <p className="font-['Cormorant_Garamond', serif] italic text-[0.95rem] text-[#888] max-w-120 mx-auto my-0 leading-[1.9]">
            Our broodmare band forms the foundation of Sweden Arabian Stud.
            Carefully selected for their beauty, pedigree, and producing
            ability, each mare is treasured as an individual.
          </p>
        </div>

        <div className="horse-grid-mares">
          {mares.map((mare) => (
            <HorseCard
              key={mare.id}
              image={mare.image}
              name={mare.name}
              parentage={mare.parentage}
              detailLink={`/mares/${mare.id}`}
            />
          ))}
        </div>
      </div>
      <style>{`
        .horse-grid-mares {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px 32px;
        }
        @media (max-width: 900px) {
          .horse-grid-mares {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 560px) {
          .horse-grid-mares {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default page;
