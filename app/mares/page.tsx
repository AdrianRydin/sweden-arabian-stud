import { HorseSectionPage } from "../components/HorseSectionPage";

export const dynamic = "force-dynamic";

const heroImage =
  "https://images.unsplash.com/photo-1758573951599-eb88f28f7297?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMEFyYWJpYW4lMjBob3JzZSUyMHNob3d8ZW58MXx8fHwxNzcyODEwNTUwfDA&ixlib=rb-4.1.0&q=80&w=1080";

function page() {
  return (
    <HorseSectionPage
      section="mares"
      title="Mares"
      heroImage={heroImage}
      eyebrow="Our Mares"
      introText="Our mares represent the foundation of our breeding programme, combining beauty, bloodlines, and character."
      emptyMessage="No mares are currently listed."
    />
  );
}

export default page;
