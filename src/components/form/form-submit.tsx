import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FormSubmitProps {
  label: string;
  icon?: LucideIcon;
  className?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
  size?: "default" | "icon" | "sm" | "lg";
}

export const FormSubmit = ({
  label,
  icon: Icon,
  className,
  variant = "default",
  size = "sm",
}: FormSubmitProps) => {
  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      className={cn("cursor-pointer", className)}
    >
      {Icon && <Icon />}
      {label}
    </Button>
  );
};
