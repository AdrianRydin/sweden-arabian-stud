import { HorseDetailPage } from "../../components/HorseDetailPage";

export const dynamic = "force-dynamic";

interface MareDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MareDetailPage({ params }: MareDetailPageProps) {
  const { id } = await params;

  return <HorseDetailPage section="mares" slug={id} />;
}
