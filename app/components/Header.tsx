"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FacebookIcon, InstagramIcon, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

  return (
    <nav
      style={{
        background: "rgba(40,40,40,0.98)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          height: 90,
        }}
      >
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            alt="logo"
            height={100}
            width={150}
            className="object-contain"
          />
        </Link>

        <div
          style={{ display: "flex", gap: 4, alignItems: "center" }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => {
            const isActive =
              link.to === "/" ? pathname === "/" : pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                href={link.to}
                style={{
                  textDecoration: "none",
                  letterSpacing: "0.1rem",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                  padding: "6px 10px",
                  borderBottom: isActive
                    ? "1px solid rgba(91,154,175,0.8)"
                    : "1px solid transparent",
                  transition: "color 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2.5">
          <a href="#">
            <FacebookIcon size={18} />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Header;
