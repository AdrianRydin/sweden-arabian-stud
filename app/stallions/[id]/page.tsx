import { HorseDetailPage } from "../../components/HorseDetailPage";

export const dynamic = "force-dynamic";

interface StallionDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function StallionDetailPage({
  params,
}: StallionDetailPageProps) {
  const { id } = await params;

  return <HorseDetailPage section="stallions" slug={id} />;
}
