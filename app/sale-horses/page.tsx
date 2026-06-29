import { HorseSectionPage } from "../components/HorseSectionPage";

export const dynamic = "force-dynamic";

const heroImage =
  "https://images.unsplash.com/photo-1656480652731-f689059a4582?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVzdG51dCUyMEFyYWJpYW4lMjBob3JzZSUyMHNhbGV8ZW58MXx8fHwxNzcyODEwNTYwfDA&ixlib=rb-4.1.0&q=80&w=1080";

function SaleHorses() {
  return (
    <HorseSectionPage
      section="sale-horses"
      title="Sale Horses"
      heroImage={heroImage}
      eyebrow="Available Horses"
      introText="A selection of horses currently available from Sweden Arabian Stud. Please contact us for more information."
      showPrice
      emptyMessage="No sale horses are currently listed."
    />
  );
}

export default SaleHorses;
