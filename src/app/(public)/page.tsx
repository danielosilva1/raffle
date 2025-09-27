import { HandHeart, HeartHandshake, Plus, Search } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Início",
  description: "Página inicial",
};

export default function Home() {
  return (
    <div className="w-[80%] flex items-center justify-center xl:max-w-2xl">
      <div className="w-full flex flex-col items-center justify-center space-y-8 md:flex-row md:space-x-32 md:space-y-0">
        <Link
          href="/my-supports"
          className="w-32 flex flex-col items-center space-y-2 text-blue-900 text-center border shadow-xs p-4 rounded-sm bg-background hover:bg-accent"
        >
          <HandHeart className="h-12 w-12" />
          <span className="text-sm">Campanhas que apoio</span>
        </Link>

        <Link
          href="/campaigns"
          className="w-32 flex flex-col items-center space-y-2 text-blue-900 text-center border shadow-xs p-4 rounded-sm bg-background hover:bg-accent"
        >
          <HeartHandshake className="h-12 w-12" />
          <span className="text-sm">Todas as campanhas</span>
        </Link>

        <Link
          href="/my-campaigns"
          className="w-32 flex flex-col items-center space-y-2 text-blue-900 text-center border shadow-xs p-4 rounded-sm bg-background hover:bg-accent"
        >
          <Search className="h-12 w-12" />
          <span className="text-sm">Minhas campanhas</span>
        </Link>

        <Link
          href="/add-campaign"
          className="w-32 flex flex-col items-center space-y-2 text-blue-900 text-center border shadow-xs p-4 rounded-sm bg-background hover:bg-accent"
        >
          <Plus className="h-12 w-12" />
          <span className="text-sm">Criar campanha</span>
        </Link>
      </div>
    </div>
  );
}
