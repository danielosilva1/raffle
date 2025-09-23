"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";
import { Label } from "@/components/ui/label";

interface FormCheckboxProps {
  id: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  checked?: boolean;
  onBlur?: () => void;
}

export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ id, label, required, disabled, errors, className, checked }, ref) => {
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
          />
          <Label htmlFor={id}>{label}</Label>
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormCheckbox.displayName = "FormCheckbox";
