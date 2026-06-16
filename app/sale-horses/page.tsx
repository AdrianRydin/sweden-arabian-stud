import { PageHero } from "../components/PageHero";
import { HorseCard } from "../components/HorseCard";
import { saleHorses } from "../data/catalogData";

const heroImage =
  "https://images.unsplash.com/photo-1656480652731-f689059a4582?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVzdG51dCUyMEFyYWJpYW4lMjBob3JzZSUyMHNhbGV8ZW58MXx8fHwxNzcyODEwNTYwfDA&ixlib=rb-4.1.0&q=80&w=1080";

function SaleHorses() {
  return (
    <div>
      <PageHero title="Sale Horses" backgroundImage={heroImage} />

      <div className="bg-white px-[clamp(20px,6vw,80px)] py-[clamp(32px,5vw,60px)] pb-[clamp(40px,6vw,80px)]">
        <div className="text-center mb-12">
          <div className="font-['Raleway',sans-serif] text-[0.65rem] tracking-[0.22em] text-[#5b9aaf] mb-2.5 uppercase">
            Horses For Sale
          </div>
          <p className="font-['Cormorant_Garamond',serif] italic text-[0.95rem] text-[#888] max-w-120 mx-auto my-0 leading-[1.9]">
            Each horse offered for sale from Sweden Arabian Stud represents our
            highest standards of quality. These horses are offered to discerning
            buyers who will continue their journey.
          </p>
        </div>

        <div className="sale-horse-grid">
          {saleHorses.map((horse) => (
            <div key={horse.id}>
              <HorseCard
                image={horse.image}
                name={horse.name}
                parentage={horse.parentage}
                badge={horse.badge}
                price={horse.price}
                detailLink={`/sale-horses/${horse.id}`}
              />
              <p className="text-center font-['Raleway',sans-serif] text-[0.68rem] text-[#888] mt-2 leading-[1.7]">
                {horse.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 px-10 py-8 bg-[#f8f8f6] border-l-[3px] border-[#5b9aaf]">
          <div className="font-['Cormorant_SC',serif] text-base text-[#444] tracking-widest mb-2">
            Purchase Enquiries
          </div>
          <p className="font-['Raleway',sans-serif] text-[0.72rem] text-[#666] leading-loose m-0">
            All prices are available on application. We welcome serious
            inquiries from qualified buyers worldwide. Pre-purchase veterinary
            examinations are encouraged. Please contact us at{" "}
            <a
              href="mailto:info@swedenarabianstud.com"
              className="text-[#5b9aaf] no-underline"
            >
              info@swedenarabianstud.com
            </a>{" "}
            or call{" "}
            <a href="tel:+46701234567" className="text-[#5b9aaf] no-underline">
              +46 70 123 4567
            </a>
            .
          </p>
        </div>
      </div>

      <style>{`
        .sale-horse-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 50px 40px;
        }
        @media (max-width: 640px) {
          .sale-horse-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default SaleHorses;
