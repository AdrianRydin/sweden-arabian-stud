const heroImage =
  "https://images.unsplash.com/photo-1760636549266-bfa580315552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JzZSUyMGJyZWVkaW5nJTIwZmFybSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzI4MTA1NjB8MA&ixlib=rb-4.1.0&q=80&w=1080";

const newsItems = [
  {
    id: 1,
    title: "2025 Nordic Arabian Championship, Stockholm",
    image:
      "https://images.unsplash.com/photo-1597509560792-796c8682d017?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JzZSUyMHNob3clMjBjaGFtcGlvbnNoaXAlMjBhd2FyZHxlbnwxfHx8fDE3NzI4MTA1NTZ8MA&ixlib=rb-4.1.0&q=80&w=400",
    date: "September 2025",
  },
  {
    id: 2,
    title: "2025 Scandinavian Arabian Horse Show",
    image:
      "https://images.unsplash.com/photo-1758573951599-eb88f28f7297?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMEFyYWJpYW4lMjBob3JzZSUyMHNob3d8ZW58MXx8fHwxNzcyODEwNTUwfDA&ixlib=rb-4.1.0&q=80&w=400",
    date: "June 2025",
  },
  {
    id: 3,
    title: "2025 All Nations Cup, Aachen",
    image:
      "https://images.unsplash.com/photo-1721233864500-3c79767d41cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYmF5JTIwc3RhbGxpb24lMjBBcmFiaWFuJTIwaG9yc2V8ZW58MXx8fHwxNzcyODEwNTU5fDA&ixlib=rb-4.1.0&q=80&w=400",
    date: "July 2025",
  },
  {
    id: 4,
    title: "2025 Arabian Horse World Championships, Paris",
    image:
      "https://images.unsplash.com/photo-1689889580395-9af8ef7e6868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBcmFiaWFuJTIwaG9yc2UlMjBydW5uaW5nJTIwZmllbGR8ZW58MXx8fHwxNzcyODEwNTUwfDA&ixlib=rb-4.1.0&q=80&w=400",
    date: "October 2025",
  },
  {
    id: 5,
    title: "Foaling Season 2025 — New Arrivals",
    image:
      "https://images.unsplash.com/photo-1691567951778-c01762eb13cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBcmFiaWFuJTIwaG9yc2UlMjBmb2FsJTIweW91bmd8ZW58MXx8fHwxNzcyODEwNTU1fDA&ixlib=rb-4.1.0&q=80&w=400",
    date: "April 2025",
  },
  {
    id: 6,
    title: "New Acquisition: Björn Al Saud joins our herd",
    image:
      "https://images.unsplash.com/photo-1733065122105-8f6bd5886857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBcmFiaWFuJTIwaG9yc2UlMjBwb3J0cmFpdCUyMHByb2ZpbGV8ZW58MXx8fHwxNzcyODEwNTQ5fDA&ixlib=rb-4.1.0&q=80&w=400",
    date: "March 2025",
  },
  {
    id: 7,
    title: "2025 European Arabian Championships, Verona",
    image:
      "https://images.unsplash.com/photo-1760636549266-bfa580315552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JzZSUyMGJyZWVkaW5nJTIwZmFybSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzI4MTA1NjB8MA&ixlib=rb-4.1.0&q=80&w=400",
    date: "August 2025",
  },
  {
    id: 8,
    title: "2024 Nordic International Arabian Horse Show",
    image:
      "https://images.unsplash.com/photo-1656480652731-f689059a4582?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVzdG51dCUyMEFyYWJpYW4lMjBob3JzZSUyMHNhbGV8ZW58MXx8fHwxNzcyODEwNTYwfDA&ixlib=rb-4.1.0&q=80&w=400",
    date: "November 2024",
  },
  {
    id: 9,
    title: "2024 Arabian Horse World Championships, Paris",
    image:
      "https://images.unsplash.com/photo-1617745021057-ca21f1be34a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmV5JTIwQXJhYmlhbiUyMG1hcmUlMjBwYXN0dXJlfGVufDF8fHx8MTc3MjgxMDU1NXww&ixlib=rb-4.1.0&q=80&w=400",
    date: "October 2024",
  },
];

function page() {
  return (
    <div>
      {/* Page header with teal bar — matching the screenshot style */}
      <div className="relative h-[clamp(80px,15vw,140px)] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImage}
          alt="News & Media"
          className="w-full h-full object-cover object-[center_60%] brightness-[0.35] saturate-[0.6]"
        />
        <div className="absolute inset-0 bg-[rgba(70,125,148,0.55)] flex items-center pl-[clamp(20px,5vw,60px)]">
          <span className="font-['Cormorant_SC',serif] text-[clamp(1.2rem,4vw,2rem)] text-white/92 tracking-[0.2em]">
            NEWS &amp; MEDIA
          </span>
        </div>
      </div>

      {/* News grid */}
      <div className="bg-white px-[clamp(16px,4vw,48px)] py-[clamp(28px,5vw,56px)] pb-[clamp(40px,6vw,72px)]">
        <div className="news-grid">
          {newsItems.map((item) => (
            <div key={item.id} className="cursor-pointer">
              <div className="w-full aspect-4/3 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover block transition-transform duration-400 hover:scale-105"
                />
              </div>
              <div className="pt-3 text-center">
                <div className="font-['Cormorant_Garamond',serif] text-[0.95rem] text-[#444] leading-[1.4] mb-1">
                  {item.title}
                </div>
                <div className="font-['Raleway',sans-serif] text-[0.6rem] text-[#aaa] tracking-[0.08em]">
                  {item.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .news-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px 20px;
        }
        @media (max-width: 900px) {
          .news-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 560px) {
          .news-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default page;
