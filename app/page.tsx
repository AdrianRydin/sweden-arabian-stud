/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import paperFxImg from "figma:asset/bb6a0e80542f322f29ee4919a34ecae57c7d9c3f.png";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="relative w-full home-hero-height">
        <Image
          src={"/swedenarabian1.jpeg"}
          alt="Hero image"
          fill
          className="object-cover block"
          style={{ objectPosition: "center 20%" }}
        />

        <div className="absolute inset-0 home-hero-gradient" />
        <img
          src={"/paper-edge.png"}
          alt="paper"
          className="absolute bottom-0 left-0 w-full pointer-events-none block"
        />

        {/* Hero Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pb-[10%]">
          <div className="uppercase mb-3.5 hero-subtitle">
            Sweden Arabian Stud
          </div>
          <h1 className="text-white m-0 text-center hero-title">
            Aspire to inspire.
          </h1>
          <div className="mt-6 flex gap-3.5 flex-wrap justify-center px-5">
            {[
              { label: "Stallions", to: "/stallions" },
              { label: "Mares", to: "/mares" },
              { label: "Sale Horses", to: "/sale-horses" },
            ].map((item) => (
              <Link key={item.to} href={item.to} className="hero-cta-button">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white text-center intro-section">
        <div className="uppercase mb-4 section-label-teal">
          Born From Dreams
        </div>
        <h2 className="section-title-italic mb-6">
          Where the Arabian spirit thrives
        </h2>
        <div className="max-w-155 mx-auto intro-text">
          <p>In the heart of Sweden, where forests meet open skies,</p>
          <p>
            a passion for the world&apos;s most ancient and noble breed was
            born.
          </p>
          <p>
            Where the elegance of the Arabian is preserved in timeless beauty.
          </p>
          <p>In this land of Nordic wonder, dreams are woven into reality.</p>
          <p>Sweden Arabian Stud is dedicated to those who love horses.</p>
          <p>To those for whom the Arabian is more than a breed —</p>
          <p>it is a way of life.</p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden family-section-height">
        <img
          src={"/swedenarabian1.jpeg"}
          alt="Swedish Arabian Horse"
          className="w-full h-full object-cover block"
          style={{ objectPosition: "center 20%" }}
        />
        <div className="absolute inset-0 family-gradient" />
        <div className="absolute top-1/2 -translate-y-1/2 max-w-95 family-content-left">
          <div className="uppercase mb-2.5 section-label-teal-light">
            Our Family
          </div>
          <div className="family-title mb-3">
            Passion passed down through generations.
          </div>
          <div className="family-description">
            For us, horses are family. We share our lives with these magnificent
            animals every day.
          </div>
        </div>
      </div>

      <div className="bg-[#f8f8f6] about-section">
        <div className="max-w-215 mx-auto text-center about-text">
          <p>
            Sweden Arabian Stud was founded with one vision: to breed and raise
            exceptional Arabian horses that combine breathtaking beauty with
            noble character. Located in the Swedish countryside, our stud has
            become a home where the finest bloodlines are nurtured and new
            champions are born.
          </p>
          <br />
          <p>
            Every horse at Sweden Arabian Stud is treated as family — raised
            with care, trained with patience, and presented to the world with
            pride. From our championship stallions to our elegant mares and
            their promising foals, every horse represents our commitment to
            excellence in the Arabian breed.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative overflow-hidden min-h-80">
          <img
            src={"/swedenarabian1.jpeg"}
            alt="Swweden Arabian Stud Image"
            className="absolute inset-0 w-full h-full object-cover block transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 flex items-end feature-image-padding">
            <div>
              <div className="feature-image-title mb-1">Our Stud</div>
              <div className="feature-image-subtitle">
                A sanctuary for the Arabian breed
              </div>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden min-h-80">
          <img
            src={"/swedenarabian1.jpeg"}
            alt="Swweden Arabian Stud Image"
            className="absolute inset-0 w-full h-full object-cover block transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 flex items-end feature-image-padding">
            <div>
              <div className="feature-image-title mb-1">Our Horses</div>
              <div className="feature-image-subtitle">
                Pure beauty, pure spirit
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="bg-[#2a2a2a] stats-section">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-8 max-w-225 mx-auto">
          {[
            { number: "12+", label: "Champion Stallions" },
            { number: "30+", label: "Broodmares" },
            { number: "15+", label: "Years of Excellence" },
            { number: "80+", label: "Horses Bred" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="stat-number mb-2">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white text-center cta-section">
        <div className="cta-title mb-3">Discover Our Horses</div>
        <div className="cta-subtitle mb-8">
          Exceptional bloodlines, extraordinary horses
        </div>
        <div className="flex gap-3.5 justify-center flex-wrap">
          {[
            { label: "Stallions", to: "/stallions" },
            { label: "Mares", to: "/mares" },
            { label: "Foals", to: "/foals" },
            { label: "Sale Horses", to: "/sale-horses" },
          ].map((item) => (
            <Link key={item.to} href={item.to} className="cta-link-button">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <style>{`
        .home-hero-height {
          height: clamp(500px, 90vh, 1000px);
        }
        .home-hero-gradient {
          background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, rgba(255,255,255,0.5) 100%);
        }
        .hero-subtitle {
          font-family: 'Raleway', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.35em;
          color: rgba(255,255,255,0.85);
        }
        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 300;
          text-shadow: 0 2px 20px rgba(0,0,0,0.3);
          line-height: 1.2;
        }
        .hero-cta-button {
          text-decoration: none;
          font-family: 'Raleway', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.6);
          padding: 9px 22px;
          backdrop-filter: blur(4px);
          background: rgba(255,255,255,0.1);
          transition: all 0.25s;
        }
        .hero-cta-button:hover {
          background: #5b9aaf;
          border-color: #5b9aaf;
        }
        .intro-section {
          padding: clamp(40px, 6vw, 80px) clamp(20px, 6vw, 80px);
        }
        .section-label-teal {
          font-family: 'Raleway', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          color: #5b9aaf;
        }
        .section-label-teal-light {
          font-family: 'Raleway', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.25em;
          color: #5b9aaf;
        }
        .section-title-italic {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(1.5rem, 3vw, 2.4rem);
          color: #333;
          font-weight: 300;
          line-height: 1.3;
        }
        .intro-text {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(0.9rem, 1.5vw, 1rem);
          color: var(--text-muted);
          line-height: 2;
        }
        .family-section-height {
          height: clamp(280px, 40vw, 560px);
        }
        .family-gradient {
          background: linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.0) 100%);
        }
        .family-content-left {
          left: clamp(20px, 5vw, 80px);
        }
        .family-title {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(1.4rem, 3vw, 2.2rem);
          color: #fff;
          line-height: 1.25;
          text-shadow: 0 2px 12px rgba(0,0,0,0.3);
        }
        .family-description {
          font-family: 'Raleway', sans-serif;
          font-size: 0.68rem;
          color: rgba(255,255,255,0.7);
          line-height: 1.8;
          letter-spacing: 0.04em;
        }
        .about-section {
          padding: clamp(40px, 6vw, 72px) clamp(20px, 8vw, 120px);
        }
        .about-text {
          font-family: 'Raleway', sans-serif;
          font-size: 0.75rem;
          color: #666;
          line-height: 2.1;
        }
        .feature-image-padding {
          padding: clamp(16px, 3vw, 36px);
        }
        .feature-image-title {
          font-family: 'Cormorant SC', serif;
          color: #fff;
          font-size: clamp(1rem, 2vw, 1.3rem);
          letter-spacing: 0.15em;
        }
        .feature-image-subtitle {
          font-family: 'Raleway', sans-serif;
          color: rgba(255,255,255,0.7);
          font-size: 0.65rem;
          letter-spacing: 0.1em;
        }
        .stats-section {
          padding: clamp(40px, 6vw, 64px) clamp(20px, 6vw, 60px);
        }
        .stat-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          color: #5b9aaf;
          line-height: 1;
        }
        .stat-label {
          font-family: 'Raleway', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
        }
        .cta-section {
          padding: clamp(48px, 8vw, 80px) clamp(20px, 6vw, 60px);
        }
        .cta-title {
          font-family: 'Cormorant SC', serif;
          font-size: clamp(1.3rem, 3vw, 1.8rem);
          color: #333;
          letter-spacing: 0.1em;
        }
        .cta-subtitle {
          font-family: 'Raleway', sans-serif;
          font-size: 0.72rem;
          color: var(--text-light);
          letter-spacing: 0.06em;
        }
        .cta-link-button {
          text-decoration: none;
          font-family: 'Raleway', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #5b9aaf;
          border: 1px solid #5b9aaf;
          padding: 10px 24px;
          transition: all 0.2s;
        }
        .cta-link-button:hover {
          background: #5b9aaf;
          color: #fff;
        }
      `}</style>
    </div>
  );
}
