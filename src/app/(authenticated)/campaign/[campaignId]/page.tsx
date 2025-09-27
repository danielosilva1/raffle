import NotFound from "@/app/not-found";
import db from "@/lib/db";
import { HeartHandshake } from "lucide-react";
import { Supports } from "../_components/supports";
import { SupportButton } from "./_components/support-button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apoie",
  description:
    "Veja os detalhes de uma campanha, adicione ou remova seu apoio a ela",
};

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
  const { userId } = await auth();
  const { campaignId } = await params;
  const campaign = await db.campaign.findUnique({
    where: {
      id: campaignId,
    },
    include: {
      campaign_supports: {
        where: {
          campaignId: campaignId,
        },
        orderBy: {
          supportedAt: "desc",
        },
      },
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

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="w-full flex flex-col items-center pt-6 pb-6 space-y-6">
      <h1 className="mb-6 px-4 text-2xl text-blue-900 text-center">
        {campaign.title}
      </h1>

      <div className="space-y-3 xl:max-w-2xl p-4 border border-blue-300 rounded-sm">
        <div className="space-x-2">
          <span className="text-neutral-900 font-semibold">Descrição:</span>
          <span className="text-neutral-900 whitespace-pre-wrap">
            {campaign.description}
          </span>
        </div>
        <div className="space-x-2">
          <span className="text-neutral-900 font-semibold">Status:</span>
          <span className="text-neutral-900">{status[campaign.status]}</span>
        </div>

        <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4">
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

        <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4">
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

        <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4">
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

      {campaign.status === "active" && (
        <SupportButton
          userId={userId}
          campaignId={campaignId}
          campaignSupports={campaign.campaign_supports}
        />
      )}

      <div className="w-full px-4 space-y-4 xl:max-w-screen-2xl">
        <div className="flex items-center justify-center space-x-2 font-semibold text-blue-800">
          <HeartHandshake />
          <span>Apoiadores</span>
        </div>
        <Supports
          supports={campaign.campaign_supports}
          allowDelete={campaign.createdBy === userId}
        />
      </div>
    </div>
  );
}
