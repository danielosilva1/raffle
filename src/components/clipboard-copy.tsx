import React from "react";
import { Button } from "./ui/button";
import { copyToClipboard } from "@/lib/utils";
import { toast } from "sonner";

interface ClipboardCopyProps {
  value: string;
  children?: React.ReactNode;
}

export const ClipboardCopy = ({ value, children }: ClipboardCopyProps) => {
  return (
    <div
      onClick={async () => {
        try {
          await copyToClipboard(value);
          toast.success("Copiado para a área de transferência");
        } catch (error) {
          console.error(error);
          toast.error("Erro ao copiar para a área de transferência");
        }
      }}
    >
      {children ? children : <Button variant="default">Copy</Button>}
    </div>
  );
};
