"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";

interface CustomAlertDialogProps {
  title: string;
  description?: string;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  children?: React.ReactNode;
}

export function CustomAlertDialog({
  title,
  description,
  children,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
}: CustomAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children ? children : <Button variant="outline">Show Dialog</Button>}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer bg-blue-800 hover:bg-blue-800/70"
            onClick={onConfirm}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
