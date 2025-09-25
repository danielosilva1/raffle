export default async function CampaignPage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = await params;

  return (
    <div className="flex h-full w-full justify-center">{`Rafle id: ${campaignId}`}</div>
  );
}
