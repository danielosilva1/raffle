import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minhas campanhas",
  description: "Veja as campanhas que você criou",
};

export default async function MyCampaigns() {
  return (
    <div className="w-full flex flex-col items-center pt-6 pb-6">
      <h1 className="mb-6 text-2xl text-blue-900">Minhas campanhas</h1>
    </div>
  );
}
