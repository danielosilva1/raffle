import React from "react";
import { Button } from "./ui/button";
import { copyToClipboard } from "@/lib/utils";

interface ClipboardCopyProps {
  value: string;
  children?: React.ReactNode;
}

export const ClipboardCopy = ({ value, children }: ClipboardCopyProps) => {
  return (
    <div
      onClick={() => {
        copyToClipboard(value);
      }}
    >
      {children ? children : <Button variant="default">Copy</Button>}
    </div>
  );
};
