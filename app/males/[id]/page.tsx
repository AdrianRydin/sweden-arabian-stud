import { HorseDetailPage } from "../../components/HorseDetailPage";

export const dynamic = "force-dynamic";

interface MaleDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MaleDetailPage({ params }: MaleDetailPageProps) {
  const { id } = await params;

  return <HorseDetailPage section="males" slug={id} />;
}
