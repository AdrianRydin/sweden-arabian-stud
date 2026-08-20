import { HorseSectionPage } from "../components/HorseSectionPage";

export const dynamic = "force-dynamic";

const heroImage =
  "https://images.unsplash.com/photo-1758573951599-eb88f28f7297?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMEFyYWJpYW4lMjBob3JzZSUyMHNob3d8ZW58MXx8fHwxNzcyODEwNTUwfDA&ixlib=rb-4.1.0&q=80&w=1080";

function FemalePage() {
  return (
    <HorseSectionPage
      section="females"
      title="Females"
      heroImage={heroImage}
      eyebrow="Our Females"
      introText="Our females represent the foundation of our breeding programme and the next generation of Sweden Arabian Stud, combining beauty, bloodlines, and character."
      showBirthYear
      emptyMessage="No females are currently listed."
    />
  );
}

export default FemalePage;
