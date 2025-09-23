import { Metadata } from "next";

import { AddRaffleForm } from "./_components/add-raffle-form";

export const metadata: Metadata = {
  title: "Criar rifa",
  description: "Crie uma rifa",
};

export default function AddRaffle() {
  return (
    <div className="w-full flex flex-col items-center pt-6 pb-6">
      <h1 className="mb-6 text-2xl text-blue-900">Criar rifa</h1>

      <AddRaffleForm />
    </div>
  );
}
