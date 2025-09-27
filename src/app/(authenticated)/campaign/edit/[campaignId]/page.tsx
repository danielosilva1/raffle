import { HeartHandshake } from "lucide-react";
import { Supports } from "../../_components/supports";
import db from "@/lib/db";
import NotFound from "@/app/not-found";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UpdateCampaignForm } from "./_components/update-campaign-form";

export default async function EditCampaign({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = await params;
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const campaign = await db.campaign.findUnique({
    where: { id: campaignId },
    include: {
      campaign_supports: {
        where: { campaignId },
        orderBy: { supportedAt: "desc" },
      },
    },
  });

  if (!campaign) {
    return NotFound();
  }

  return (
    <div className="w-full flex flex-col items-center pt-6 pb-6 space-y-6">
      <h1 className="mb-6 text-2xl text-blue-900">Editar campanha</h1>

      <UpdateCampaignForm campaign={campaign} />

      <div className="w-full px-4 space-y-4 xl:max-w-screen-2xl">
        <div className="flex items-center justify-center space-x-2 font-semibold text-blue-800">
          <HeartHandshake />
          <span>Apoiadores</span>
        </div>
        <Supports supports={campaign.campaign_supports} allowDelete={true} />
      </div>
    </div>
  );
}
