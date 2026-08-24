import { HorseSectionPage } from "../components/HorseSectionPage";

export const dynamic = "force-dynamic";

const heroImage = "/females-image.jpg";

function FemalePage() {
  return (
    <HorseSectionPage
      section="females"
      title="Females"
      heroImage={heroImage}
      eyebrow="Our Females"
      introText="The heart of Sweden Arabian Stud — carefully selected mares, exceptional bloodlines and generations of quality with a vision for the future."
      showBirthYear
      emptyMessage="No females are currently listed."
    />
  );
}

export default FemalePage;
