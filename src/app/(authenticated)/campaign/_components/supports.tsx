import { CampaignSupport } from "@/generated/prisma";
import { SupportCard } from "./support-card";

interface SupportsProps {
  supports: CampaignSupport[];
  allowDelete?: boolean;
}

export const Supports = ({ supports, allowDelete = false }: SupportsProps) => {
  return supports.length > 0 ? (
    <div
      className="
        w-full flex flex-col space-y-4
        md:grid md:grid-cols-2 md:gap-6
        xl:grid-cols-3
      "
    >
      {supports.map((support) => (
        <SupportCard
          key={support.id}
          support={support}
          allowDelete={allowDelete}
        />
      ))}
    </div>
  ) : (
    <p className="text-sm font-semibold text-center text-blue-900">
      Não há apoiadores ainda
    </p>
  );
};
