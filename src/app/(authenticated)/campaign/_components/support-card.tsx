import { CustomTooltip } from "@/components/custom-tooltip";
import { Button } from "@/components/ui/button";
import { Schema } from "@/lib/actions/create-campaign-support/types";
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
    <div className="group/card w-full h-full p-2 text-blue-900 border border-blue-300 bg-blue-300/30 rounded-sm">
      <p className="text-lg">{support.supporterName}</p>

      <blockquote className="mt-4 italic text-sm text-blue-900">
        {support.message ?? "Apoiador(a) não deixou mensagem"}
      </blockquote>

      {allowDelete && (
        <div className="hidden justify-end group-hover/card:flex">
          <CustomTooltip content="Remover apoio">
            <Button size="icon" variant="outline">
              <HeartOff />
            </Button>
          </CustomTooltip>
        </div>
      )}
    </div>
  );
};
