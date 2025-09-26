import NotFound from "@/app/not-found";
import db from "@/lib/db";

const status: Record<string, string> = {
  active: "Ativa",
  closed: "Finalizada",
  cancelled: "Cancelada",
};

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = await params;
  const campaign = await db.campaign.findUnique({
    where: {
      id: campaignId,
    },
    include: {
      _count: {
        select: {
          campaign_supports: {
            where: {
              campaignId: campaignId,
            },
          },
        },
      },
    },
  });

  if (!campaign) {
    return NotFound();
  }

  return (
    <div className="w-full flex flex-col items-center pt-6 pb-6">
      <h1 className="mb-6 text-2xl text-blue-900 text-center">
        {campaign.title}
      </h1>

      <div className="w-[80%] space-y-3 xl:max-w-2xl p-4 border border-blue-300 rounded-sm">
        <div className="space-x-2">
          <span className="text-neutral-900 font-semibold">Descrição:</span>
          <span className="text-neutral-900">{campaign.description}</span>
        </div>
        <div className="space-x-2">
          <span className="text-neutral-900 font-semibold">Status:</span>
          <span className="text-neutral-900">{status[campaign.status]}</span>
        </div>

        <div className="space-y-3 md:grid md:grid-cols-2">
          <div className="space-x-2">
            <span className="text-neutral-900 font-semibold">
              Número de apoiadores:
            </span>
            <span className="text-neutral-900">
              {campaign._count.campaign_supports}
            </span>
          </div>
          <div className="space-x-2">
            <span className="text-neutral-900 font-semibold">
              Meta de apoiadores:
            </span>
            <span className="text-neutral-900">
              {campaign.targetSupporters}
            </span>
          </div>
        </div>

        <div className="space-y-3 md:grid md:grid-cols-2">
          <div className="space-x-2">
            <span className="text-neutral-900 font-semibold">
              Data de início:
            </span>
            <span className="text-neutral-900">
              {campaign.startDate.toLocaleDateString()}
            </span>
          </div>
          <div className="space-x-2">
            <span className="text-neutral-900 font-semibold">Data de fim:</span>
            <span className="text-neutral-900">
              {campaign.endDate
                ? campaign.endDate.toLocaleDateString()
                : "Sem data definida"}
            </span>
          </div>
        </div>

        <div className="space-y-3 md:grid md:grid-cols-2">
          <div className="space-x-2">
            <span className="text-neutral-900 font-semibold">
              Organizador(a):
            </span>
            <span className="text-neutral-900">{campaign.organizerName}</span>
          </div>
          <div className="space-x-2">
            <span className="text-neutral-900 font-semibold">
              Data de cadastro:
            </span>
            <span className="text-neutral-900">
              {campaign.createdAt.toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
