"use client";

import { CustomTooltip } from "@/components/custom-tooltip";
import { Button } from "@/components/ui/button";
import { CampaignSupport } from "@/generated/prisma";
import { deleteCampaignSupport } from "@/lib/actions/delete-campaign-support/delete-campaign-support";
import { HeartOff } from "lucide-react";
import { toast } from "sonner";

interface SupportCardProps {
  support: CampaignSupport;
  allowDelete: boolean;
}

export const SupportCard = ({ support, allowDelete }: SupportCardProps) => {
  const onDeleteSupport = async () => {
    const { success, message } = await deleteCampaignSupport({
      campaignSupportId: support.id,
    });

    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col justify-between w-full h-full p-2 text-blue-900 border border-blue-300 bg-blue-300/30 rounded-sm">
      <p className="text-lg">{support.supporterName}</p>

      <blockquote className="flex h-full mt-4 italic text-sm text-blue-900">
        {support.message ?? "Apoiador(a) não deixou mensagem"}
      </blockquote>

      {allowDelete && (
        <div className="flex justify-end">
          <CustomTooltip content="Remover apoio">
            <form action={onDeleteSupport}>
              <Button
                size="icon"
                variant="ghost"
                className="w-7 h-7 bg-red-300 hover:bg-red-300/70"
                type="submit"
              >
                <HeartOff />
              </Button>
            </form>
          </CustomTooltip>
        </div>
      )}
    </div>
  );
};
