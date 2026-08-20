import { HorseDetailPage } from "../../components/HorseDetailPage";

export const dynamic = "force-dynamic";

interface FemaleDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function FemaleDetailPage({
  params,
}: FemaleDetailPageProps) {
  const { id } = await params;

  return <HorseDetailPage section="females" slug={id} />;
}
