import { FacebookIcon, InstagramIcon, Mail, Phone } from "lucide-react";

export function UnderConstruction() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center text-center construction-padding">
        <video
          src="/sweden-logo-animation-white-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="construction-video"
        />

        <div className="uppercase construction-label">Sweden Arabian Stud</div>

        <h1 className="construction-title mt-3">Under Construction</h1>

        <div className="flex items-center construction-divider">
          <div className="flex-1 h-px bg-linear-to-r from-transparent to-(--sage-light)" />
          <div className="w-2 h-2 rounded-full bg-(--sage) shadow-[0_0_12px_rgba(139,157,131,0.6)]" />
          <div className="flex-1 h-px bg-linear-to-l from-transparent to-(--sage-light)" />
        </div>

        <p className="construction-text">
          Our website is being lovingly re-built. Please check back soon to
          discover our Arabian stallions, mares and foals — or reach out to us
          directly below.
        </p>

        <div className="construction-contact">
          <a
            href="mailto:kathleen@swedenarabianstud.com"
            className="construction-contact-link"
          >
            <Mail size={13} /> kathleen@swedenarabianstud.com
          </a>
          <a href="tel:+46762235910" className="construction-contact-link">
            <Phone size={13} /> +46 76 223 5910
          </a>
        </div>

        <div className="flex gap-3 construction-socials">
          <a
            href="https://www.facebook.com/kathleenohlsson"
            target="_blank"
            rel="noopener noreferrer"
            className="construction-social-icon"
            aria-label="Visit our Facebook page"
          >
            <FacebookIcon size={16} />
          </a>
          <a
            href="https://www.instagram.com/kathleenohlsson/"
            target="_blank"
            rel="noopener noreferrer"
            className="construction-social-icon"
            aria-label="Visit our Instagram page"
          >
            <InstagramIcon size={16} />
          </a>
        </div>
      </div>

      <div className="text-center construction-copyright">
        © 2026 Sweden Arabian Stud. All Rights Reserved.
      </div>

      <style>{`
        .construction-padding {
          padding: clamp(32px, 8vw, 80px) clamp(20px, 6vw, 80px);
        }
        .construction-video {
          width: clamp(220px, 32vw, 380px);
          height: auto;
        }
        .construction-label {
          font-family: 'Raleway', sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.35em;
          color: #5b9aaf;
        }
        .construction-title {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(2rem, 5vw, 4rem);
          color: #2a2a2a;
          line-height: 1.2;
        }
        .construction-divider {
          width: clamp(160px, 30vw, 240px);
          margin: 28px 0;
        }
        .construction-text {
          font-family: 'Raleway', sans-serif;
          font-size: 0.8rem;
          color: #6a6a6a;
          line-height: 1.9;
          letter-spacing: 0.02em;
          max-width: 30rem;
          margin: 0 0 32px;
        }
        .construction-contact {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 28px;
          justify-content: center;
        }
        .construction-contact-link {
          display: flex;
          align-items: center;
          gap: 7px;
          text-decoration: none;
          font-family: 'Raleway', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.04em;
          color: #555;
          transition: color 0.2s;
        }
        .construction-contact-link:hover {
          color: #5b9aaf;
        }
        .construction-socials {
          margin-top: 24px;
        }
        .construction-social-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--beige-light);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #5b9aaf;
          transition: background 0.2s, color 0.2s;
        }
        .construction-social-icon:hover {
          background: #5b9aaf;
          color: #fff;
        }
        .construction-copyright {
          font-family: 'Raleway', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          color: #999;
          padding: 0 20px 24px;
        }
      `}</style>
    </div>
  );
}
