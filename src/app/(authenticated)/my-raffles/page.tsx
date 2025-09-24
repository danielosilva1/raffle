import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minhas rifas",
  description: "Veja as rifas que você criou",
};

export default async function Page() {
  return (
    <div className="w-full flex flex-col items-center pt-6 pb-6">
      <h1 className="mb-6 text-2xl text-blue-900">Minhas rifas</h1>
    </div>
  );
}
