import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entre ou cadastre-se",
};

export default function Page() {
  return (
    <div className="flex justify-center items-center w-full">
      <SignIn />
    </div>
  );
}
