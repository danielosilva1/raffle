import { CustomTooltip } from "@/components/custom-tooltip";
import { Button } from "@/components/ui/button";
import { Schema } from "@/lib/actions/add-campaign-support/types";
import { HeartOff } from "lucide-react";

export type Support = Schema & {
  id: string;
};

interface SupportCardProps {
  support: Support;
  allowDelete: boolean;
}

export const SupportCard = ({ support, allowDelete }: SupportCardProps) => {
  return (
    <div className="flex flex-col justify-between w-full h-full p-2 text-blue-900 border border-blue-300 bg-blue-300/30 rounded-sm">
      <p className="text-lg">{support.supporterName}</p>

      <blockquote className="flex h-full mt-4 italic text-sm text-blue-900">
        {support.message ?? "Apoiador(a) não deixou mensagem"}
      </blockquote>

      {allowDelete && (
        <div className="flex justify-end">
          <CustomTooltip content="Remover apoio">
            <Button
              size="icon"
              variant="ghost"
              className="w-7 h-7 bg-red-300 hover:bg-red-300/70"
            >
              <HeartOff />
            </Button>
          </CustomTooltip>
        </div>
      )}
    </div>
  );
};
