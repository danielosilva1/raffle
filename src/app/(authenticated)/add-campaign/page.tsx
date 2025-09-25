import { Metadata } from "next";

import { AddCampaignForm } from "./_components/add-campaign-form";

export const metadata: Metadata = {
  title: "Criar campanha",
  description: "Crie uma campanha",
};

export default function AddCampaign() {
  return (
    <div className="w-full flex flex-col items-center pt-6 pb-6">
      <h1 className="mb-6 text-2xl text-blue-900">Criar campanha</h1>

      <AddCampaignForm />
    </div>
  );
}
