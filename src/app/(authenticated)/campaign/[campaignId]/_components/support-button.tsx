"use client";

import { HeartOff } from "lucide-react";
import { toast } from "sonner";
import { deleteCampaignSupport } from "@/lib/actions/delete-campaign-support/delete-campaign-support";
import { SupportPopover } from "./support-popover";
import { CampaignSupport } from "@/generated/prisma";
import { CustomAlertDialog } from "@/components/custom-alert-dialog";
import { Button } from "@/components/ui/button";

interface SupportButtonProps {
  userId: string;
  campaignId: string;
  campaignSupports: CampaignSupport[];
}

export const SupportButton = ({
  userId,
  campaignId,
  campaignSupports,
}: SupportButtonProps) => {
  // True if logged user already supports the campaign
  const isSupporter = campaignSupports.find(
    (campaignSupport) => campaignSupport.supporterUserId === userId
  );

  const onDeleteMySupport = async () => {
    // Id of campaign support by logged user
    const campaignSupportId = campaignSupports.find(
      (support) => support.supporterUserId === userId
    )?.id;

    if (!campaignSupportId) {
      toast.error("Erro ao remover apoio");
      return;
    }

    const { success, message } = await deleteCampaignSupport({
      campaignSupportId,
    });

    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return isSupporter ? (
    <CustomAlertDialog
      title="Confirma a remoção do apoio?"
      onConfirm={onDeleteMySupport}
      confirmLabel="Continuar"
      cancelLabel="Cancelar"
    >
      <Button
        variant="default"
        size="lg"
        className="font-bold bg-red-800 hover:bg-red-800/70"
      >
        <HeartOff />
        Remover meu apoio
      </Button>
    </CustomAlertDialog>
  ) : (
    <SupportPopover campaignId={campaignId} />
  );
};
