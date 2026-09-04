import Image from "next/image";
import { PageHero } from "../components/PageHero";

const heroImage = "/AADJI_20260903102509_0037_D.jpg";

interface StudSectionProps {
  image: string;
  alt: string;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  reverse?: boolean;
}

function StudSection({
  image,
  alt,
  eyebrow,
  heading,
  paragraphs,
  reverse = false,
}: StudSectionProps) {
  return (
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-14">
      <div
        className={`relative aspect-4/3 w-full overflow-hidden ${
          reverse ? "md:order-1" : "md:order-2"
        }`}
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className={reverse ? "md:order-2" : "md:order-1"}>
        <div className="mb-2.5 font-['Raleway',sans-serif] text-[0.65rem] tracking-[0.22em] text-(--teal) uppercase">
          {eyebrow}
        </div>

        <h2 className="mb-4 font-['Cormorant_Garamond',serif] text-2xl text-[#333] md:text-3xl">
          {heading}
        </h2>

        <div className="space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="font-['Raleway',sans-serif] text-[0.85rem] leading-7 text-(--text-secondary)"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function StudPage() {
  return (
    <div>
      <PageHero title="Our Stud" backgroundImage={heroImage} />

      <div className="bg-white px-[clamp(20px,6vw,80px)] py-[clamp(32px,5vw,60px)] pb-[clamp(40px,6vw,80px)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-16 md:gap-24">
          <StudSection
            image="/stud1.jpg"
            alt="A Lifelong Passion for Arabian Horses"
            eyebrow="Our Story"
            heading="A Lifelong Passion for Arabian Horses"
            paragraphs={[
              "Sweden Arabian Stud is a boutique Arabian horse breeding farm in Uddevalla, Sweden, owned by Kathleen, Joakim Ohlsson and their daughter Ofelia. Internationally recognized for breeding high quality Arabian horses, the stud has built a strong reputation for producing horses of outstanding type, quality, and world-class bloodlines.",
              "Kathleen Ohlsson developed a passion for horses at an early age and got her first Arabian horse when she was just thirteen years old. Her love for the breed became the foundation of Sweden Arabian Stud. The stud officially began in 2003 with the purchase of its first stallion and has since evolved into a carefully developed breeding program focused on excellence. Joakim Ohlsson joined the journey later and quickly developed a deep passion for Arabian horses. Kathleen is an ECAHO B Judge.",
            ]}
          />

          <StudSection
            image="/stud2.jpg"
            alt="Quality Over Quantity"
            eyebrow="Breeding Program"
            heading="Quality Over Quantity"
            paragraphs={[
              "The breeding program is based on a carefully selected group of mares, with influential foundation mares such as the World Champion mare Alma Al Tiglio and the very special Athbayat JJ, whose legacy continues to shape the success of the stud. Sweden Arabian Stud believes in quality over quantity, breeding only a limited number of foals each year, with every mating carefully planned to produce not only successful show horses but also future breeding horses of the highest standard. Every horse bred by Sweden Arabian Stud proudly carries the stud's distinctive “O” suffix after the name.",
              "For ten years, Sweden Arabian Stud was home to the legendary black stallion Magic Magnifique, one of the breed's most admired sires.",
              "The stud farm was also home for WF Gawin his first breeding season and to Medan Al Shaqab.",
            ]}
            reverse
          />

          <StudSection
            image="/stud3.jpg"
            alt="Recognized on the International Stage"
            eyebrow="Expertise & Legacy"
            heading="Recognized on the International Stage"
            paragraphs={[
              "Kathleen and Joakim are also educated in modern equine reproduction and breeding management. Both are certified semen technicians approved by the Swedish Board of Agriculture and operate an EU-approved station for artificial insemination and embryo transfer.",
              "Today, Sweden Arabian Stud is recognized as one of Scandinavia's leading boutique Arabian horse breeding programs. Horses bred by the stud have been exported internationally and continue to achieve success in the show ring while contributing to breeding programs around the world. Through dedication, careful planning, and an unwavering commitment to excellence, Kathleen and Joakim continue to promote Swedish Arabian horse breeding on the international stage.",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default StudPage;
