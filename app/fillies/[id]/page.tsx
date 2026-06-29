import { HorseDetailPage } from "../../components/HorseDetailPage";

export const dynamic = "force-dynamic";

interface FillyDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function FillyDetailPage({
  params,
}: FillyDetailPageProps) {
  const { id } = await params;

  return <HorseDetailPage section="fillies" slug={id} />;
}
