import { HandHeart } from "lucide-react";

export const Footer = () => {
  return (
    <div className="p-1 bottom-0 w-full px-4 border-t border-blue-100 bg-blue-50 flex justify-center">
      <div className="flex flex-col items-center">
        <HandHeart className="h-5 w-5 text-blue-500" />
        <span className="hidden text-blue-500 text-xs tracking-wide md:block xl:text-sm">
          Este é um projeto <span className="font-bold">educativo</span> e{" "}
          <span className="font-bold">sem fins lucrativos</span>
        </span>
      </div>
    </div>
  );
};
