"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { FormErrors } from "./form-errors";
import { DatePicker } from "@/components/ui/date-picker";

interface FormDatePickerProps {
  id: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  value?: string;
}

export const FormDatePicker = forwardRef<HTMLInputElement, FormDatePickerProps>(
  ({ id, label, value, placeholder, disabled, errors, className }, ref) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2 w-full">
        <div className="space-y-1">
          {label && (
            <div className="">
              <Label
                htmlFor={id}
                className="text-sm font-semibold text-neutral-700"
              >
                {label}
              </Label>
            </div>
          )}
          <DatePicker
            id={id}
            value={value}
            disabled={disabled || pending}
            ref={ref}
            placeholder={placeholder}
            className={className}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormDatePicker.displayName = "FormDatePicker";
