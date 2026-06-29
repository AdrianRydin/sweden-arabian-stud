import { HorseSectionPage } from "../components/HorseSectionPage";

export const dynamic = "force-dynamic";

const heroImage =
  "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1600&q=80";

export default function Fillies() {
  return (
    <HorseSectionPage
      section="fillies"
      title="Fillies"
      heroImage={heroImage}
      eyebrow="Our Fillies"
      introText="Our fillies represent the next generation of Sweden Arabian Stud, selected for beauty, bloodlines, movement, and future breeding potential."
      showBirthYear
      emptyMessage="No fillies are currently listed."
    />
  );
}
