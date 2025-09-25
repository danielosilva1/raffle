import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

interface CustomTooltipProps {
  content: string;
  children?: React.ReactNode;
}

export function CustomTooltip({ content, children }: CustomTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {children ? children : <Button variant="outline">Hover</Button>}
      </TooltipTrigger>
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
}
