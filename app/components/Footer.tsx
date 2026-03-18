import { FacebookIcon, InstagramIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/stallions", label: "Stallions" },
  { to: "/mares", label: "Mares" },
  { to: "/foals", label: "Foals" },
  { to: "/sale-horses", label: "Sale Horses" },
  { to: "/news-media", label: "News & Media" },
  { to: "/contact", label: "Contact" },
];

function Footer() {
  return (
    <footer className="bg-[#2a2a2a] pt-14 pb-6">
      <div className="max-w-350 mx-auto px-10">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src={"/logo.png"}
                alt="Sweden Arabian Stud"
                width={150}
                height={100}
              />
            </div>
            <div className="footer-contact-info">
              <Link href={"tel:0762235910"}>T: +46 70 123 4567</Link>
              <div>
                E:{" "}
                <Link
                  href="mailto:kathleen@swedenarabianstud.com"
                  className="text-[#5b9aaf] no-underline hover:text-[#4a8899] transition-colors"
                >
                  kathleen@swedenarabianstud.com
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="footer-section-title">Quick Links</div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-1.5">
              {navLinks.map((link) => (
                <Link key={link.to} href={link.to} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <div className="footer-section-title">Connect With Us</div>
            <div className="flex flex-col gap-2.5">
              <Link
                href="https://www.facebook.com/kathleenohlsson"
                className="footer-social-link"
                target="_blank"
              >
                <FacebookIcon size={13} /> Facebook
              </Link>
              <Link
                href="https://www.instagram.com/kathleenohlsson/"
                className="footer-social-link"
                target="_blank"
              >
                <InstagramIcon size={13} /> Instagram
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-[rgba(255,255,255,0.08)] pt-5 mt-10 text-center footer-copyright">
          © 2026 Sweden Arabian Stud. All Rights Reserved.
        </div>
      </div>
      <style>{`

        /* Footer */
        .footer-contact-info {
          font-family: 'Raleway', sans-serif;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.45);
          line-height: 2;
        }
        .footer-section-title {
          font-family: 'Raleway', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.3);
          margin-bottom: 16px;
          text-transform: uppercase;
        }
        .footer-link {
          text-decoration: none;
          font-family: 'Raleway', sans-serif;
          font-size: 0.68rem;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.04em;
          transition: color 0.2s;
        }
        .footer-link:hover {
          color: rgba(255,255,255,0.7);
        }
        .footer-social-link {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          font-family: 'Raleway', sans-serif;
          font-size: 0.68rem;
          color: rgba(255,255,255,0.45);
          transition: color 0.2s;
        }
        .footer-social-link:hover {
          color: rgba(255,255,255,0.7);
        }
        .footer-copyright {
          font-family: 'Raleway', sans-serif;
          font-size: 0.6rem;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.1em;
        }

        /* Responsive utilities */
        @media (max-width: 767px) {
         
          .footer-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 32px !important;
          }
        }
        @media (min-width: 768px) {
          
          .footer-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
      ;
    </footer>
  );
}

export default Footer;
