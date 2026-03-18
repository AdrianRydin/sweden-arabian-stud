"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FacebookIcon, InstagramIcon, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import "../globals.css";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/stallions", label: "Stallions" },
  { to: "/mares", label: "Mares" },
  { to: "/foals", label: "Foals" },
  { to: "/sale-horses", label: "Sale Horses" },
  { to: "/news-media", label: "News & Media" },
  { to: "/contact", label: "Contact" },
];
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-100 nav-background shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
      <div className="max-w-350 mx-auto flex items-center justify-between px-8 h-22.5">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            alt="logo"
            height={100}
            width={150}
            className="object-contain"
          />
        </Link>

        <div className="hidden-mobile flex gap-1 items-center">
          {navLinks.map((link) => {
            const isActive =
              link.to === "/" ? pathname === "/" : pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                href={link.to}
                className={`no-underline leading-[0.7rem] tracking-[0.1rem] 
                    ${isActive ? "text-white font-bold" : "text-[rgba(255,255,255,0.55)] font-normal"} 
                    px-2.5 py-1.5 ${isActive ? "border-b border-[rgba(91,154,175,0.9)]" : "border-b border-transparent"} 
                    transition-colors whitespace-nowrap`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden-mobile flex gap-2">
            <a href="#" className="social-icon-desktop">
              <FacebookIcon size={18} />
            </a>
            <a href="#" className="social-icon-desktop">
              <InstagramIcon size={18} />
            </a>
          </div>

          {/* Hamburger button */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="show-mobile bg-transparent border-none text-[rgba(255,255,255.0.85)] cursor-pointer p-1.5 hidden items-center justify-center rounded"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="show-mobile-block mobile-menu-container">
          {navLinks.map((link) => {
            const isActive =
              link.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                href={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`mobile-nav-link ${isActive ? "mobile-nav-link-active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
          {/* Social icons in mobile menu */}
          <div className="flex gap-3 px-8 pt-4 border-t border-[rgba(255,255,255,0.07)] mt-2">
            <a href="#" className="mobile-social-link">
              <FacebookIcon size={13} /> Facebook
            </a>
            <a href="#" className="mobile-social-link">
              <InstagramIcon size={13} /> Instagram
            </a>
          </div>
        </div>
      )}
      {/* Styles */}
      <style>{`
        /* Navigation Links */
        .nav-link {
          text-decoration: none;
          font-family: 'Raleway', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.55);
          font-weight: 400;
          padding: 6px 10px;
          border-bottom: 1px solid transparent;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .nav-link-active {
          color: #fff;
          font-weight: 600;
          border-bottom: 1px solid rgba(91,154,175,0.9);
        }

        /* Social Icons - Desktop */
        .social-icon-desktop {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: background 0.2s;
        }
        .social-icon-desktop:hover {
          background: rgba(255,255,255,0.2);
        }

        /* Mobile Menu */
        .mobile-menu-container {
          background: rgba(30,30,30,0.99);
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 12px 0 20px;
        }
        .mobile-nav-link {
          display: block;
          text-decoration: none;
          font-family: 'Raleway', sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.7);
          font-weight: 400;
          padding: 12px 32px;
          border-left: 2px solid transparent;
          transition: all 0.15s;
        }
        .mobile-nav-link-active {
          color: #5b9aaf;
          font-weight: 600;
          border-left: 2px solid #5b9aaf;
        }
        .mobile-social-link {
          display: flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          font-family: 'Raleway', sans-serif;
          font-size: 0.68rem;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.08em;
          transition: color 0.2s;
        }
        .mobile-social-link:hover {
          color: rgba(255,255,255,0.7);
        }



        /* Responsive utilities */
        @media (max-width: 767px) {
          .hidden-mobile {
            display: none !important;
          }
          .show-mobile {
            display: flex !important;
          }
          .show-mobile-block {
            display: block !important;
          }

        }
        @media (min-width: 768px) {
          .hidden-mobile {
            display: flex !important;
          }
          .show-mobile {
            display: none !important;
          }
          .show-mobile-block {
            display: none !important;
          }

        }
      `}</style>
    </nav>
  );
}

export default Header;
