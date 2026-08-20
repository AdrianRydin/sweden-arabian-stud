import { HorseSectionPage } from "../components/HorseSectionPage";

export const dynamic = "force-dynamic";

const heroImage =
  "https://images.unsplash.com/photo-1721233864500-3c79767d41cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYmF5JTIwc3RhbGxpb24lMjBBcmFiaWFuJTIwaG9yc2V8ZW58MXx8fHwxNzcyODEwNTU5fDA&ixlib=rb-4.1.0&q=80&w=1080";

function MalePage() {
  return (
    <HorseSectionPage
      section="males"
      title="Males"
      heroImage={heroImage}
      eyebrow="Our Males"
      introText="Discover the males of Sweden Arabian Stud, carefully selected for type, temperament, movement, and pedigree."
      emptyMessage="No males are currently listed."
    />
  );
}

export default MalePage;
