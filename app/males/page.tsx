import { HorseSectionPage } from "../components/HorseSectionPage";

export const dynamic = "force-dynamic";

const heroImage = "/males-image.jpg";

function MalePage() {
  return (
    <HorseSectionPage
      section="males"
      title="Males"
      heroImage={heroImage}
      eyebrow="Our Males"
      introText="Our carefully selected males represent the vision behind Sweden Arabian Stud — with ambition to inspire the next generation."
      emptyMessage="No males are currently listed."
    />
  );
}

export default MalePage;
