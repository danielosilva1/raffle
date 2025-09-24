"use client";

import { FocusEvent, forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { FormError } from "./form-error";

interface FormCheckboxProps {
  id: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  checked?: boolean;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  (
    { id, label, required, disabled, error, className, checked, onBlur },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div
        className={cn("space-y-2 w-full text-sm text-neutral-700", className)}
      >
        <div className="flex items-center space-x-2">
          <input
            id={id}
            ref={ref}
            name={id}
            type="checkbox"
            disabled={disabled || pending}
            required={required}
            checked={checked}
            onBlur={onBlur}
          />
          <Label htmlFor={id}>{label}</Label>
        </div>
        <FormError id={id} error={error} />
      </div>
    );
  }
);

FormCheckbox.displayName = "FormCheckbox";
