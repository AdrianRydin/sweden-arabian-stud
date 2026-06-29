import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sweden Arabian Stud",
  description: "A passionate horse breeding company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body
        className={`${raleway.variable}  antialiased min-h-screen bg-white `}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
