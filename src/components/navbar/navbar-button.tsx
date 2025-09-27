import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface NavbarButtonProps {
  label?: string;
  href: string;
  icon: LucideIcon;
  className?: string;
}

export const NavbarButton = ({
  label,
  href,
  icon: Icon,
  className,
}: NavbarButtonProps) => {
  return (
    <Link
      href={href}
      className={cn(
        className,
        "flex items-center h-8 font-semibold rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
      )}
      role="button"
    >
      <Icon className="h-4 w-4" />
      {label && <span className="text-sm">{label}</span>}
    </Link>
  );
};
