import { HorseSectionPage } from "../components/HorseSectionPage";

export const dynamic = "force-dynamic";

const heroImage =
  "https://images.unsplash.com/photo-1691567951778-c01762eb13cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBcmFiaWFuJTIwaG9yc2UlMjBmb2FsJTIweW91bmd8ZW58MXx8fHwxNzcyODEwNTU1fDA&ixlib=rb-4.1.0&q=80&w=1080";

export default function Foals() {
  return (
    <HorseSectionPage
      section="foals"
      title="Foals"
      heroImage={heroImage}
      eyebrow="Class of 2025"
      introText="Every foal born at Sweden Arabian Stud carries the promise of greatness. Bred from our finest bloodlines, they are the future of our programme."
      showBirthYear
      emptyMessage="No foals are currently listed."
    >
      <div className="my-14 border border-[#e8e8e4] p-8 text-center">
        <div className="mb-2 font-['Cormorant_SC',serif] text-base tracking-widest text-[#444]">
          2026 Breeding Season
        </div>

        <p className="m-0 font-['Raleway',sans-serif] text-[0.7rem] leading-loose text-[#888]">
          We are currently planning our 2026 breeding season. If you are
          interested in a foal from a specific pairing, please{" "}
          <a href="/contact" className="text-[#5b9aaf] no-underline">
            contact us
          </a>{" "}
          to discuss possibilities.
        </p>
      </div>
    </HorseSectionPage>
  );
}
