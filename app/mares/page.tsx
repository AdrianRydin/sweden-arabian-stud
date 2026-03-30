import { PageHero } from "../components/PageHero";
import { HorseCard } from "../components/HorseCard";

const heroImage =
  "https://images.unsplash.com/photo-1758573951599-eb88f28f7297?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMEFyYWJpYW4lMjBob3JzZSUyMHNob3d8ZW58MXx8fHwxNzcyODEwNTUwfDA&ixlib=rb-4.1.0&q=80&w=1080";

const mares = [
  {
    id: 1,
    name: "Isadora SAS",
    parentage: "Marwan Al Shaqab × Ingrid AT",
    image:
      "https://images.unsplash.com/photo-1758573951599-eb88f28f7297?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMEFyYWJpYW4lMjBob3JzZSUyMHNob3d8ZW58MXx8fHwxNzcyODEwNTUwfDA&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    id: 2,
    name: "Saga Arabica",
    parentage: "Kahil Al Shaqab × Solveig",
    image:
      "https://images.unsplash.com/photo-1617745021057-ca21f1be34a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmV5JTIwQXJhYmlhbiUyMG1hcmUlMjBwYXN0dXJlfGVufDF8fHx8MTc3MjgxMDU1NXww&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    id: 3,
    name: "Freya Al Noor",
    parentage: "WH Justice × Fjord Rose",
    image:
      "https://images.unsplash.com/photo-1733065122105-8f6bd5886857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBcmFiaWFuJTIwaG9yc2UlMjBwb3J0cmFpdCUyMHByb2ZpbGV8ZW58MXx8fHwxNzcyODEwNTQ5fDA&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    id: 4,
    name: "Aurora SAS",
    parentage: "Morion × Borealis Queen",
    image:
      "https://images.unsplash.com/photo-1724048413085-1c8d81b3ffa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JzZSUyMHN0dWQlMjBmYXJtJTIwU3dlZGVufGVufDF8fHx8MTc3MjgxMDU1MXww&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    id: 5,
    name: "Linnea Arabica",
    parentage: "Wadee Al Shaqab × Nordic Grace",
    image:
      "https://images.unsplash.com/photo-1689889580395-9af8ef7e6868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBcmFiaWFuJTIwaG9yc2UlMjBydW5uaW5nJTIwZmllbGR8ZW58MXx8fHwxNzcyODEwNTUwfDA&ixlib=rb-4.1.0&q=80&w=400",
  },
  {
    id: 6,
    name: "Sigrid Al Majd",
    parentage: "Padrons Psyche × Sigrid",
    image:
      "https://images.unsplash.com/photo-1721233864500-3c79767d41cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYmF5JTIwc3RhbGxpb24lMjBBcmFiaWFuJTIwaG9yc2V8ZW58MXx8fHwxNzcyODEwNTU5fDA&ixlib=rb-4.1.0&q=80&w=400",
  },
];

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
