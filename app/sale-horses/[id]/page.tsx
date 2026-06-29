import { HorseDetailPage } from "../../components/HorseDetailPage";

export const dynamic = "force-dynamic";

interface SaleHorseDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function SaleHorseDetailPage({
  params,
}: SaleHorseDetailPageProps) {
  const { id } = await params;

  return <HorseDetailPage section="sale-horses" slug={id} />;
}
