"use client";

import { FocusEvent, forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { FormError } from "./form-error";

interface FormDatePickerProps {
  id: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  value?: string;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onChange?: (value: string) => void;
}

export const FormDatePicker = forwardRef<HTMLInputElement, FormDatePickerProps>(
  (
    {
      id,
      label,
      value,
      placeholder,
      disabled,
      error,
      className,
      onBlur,
      onChange,
    },
    ref
  ) => {
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
            onBlur={onBlur}
            onChange={onChange}
          />
        </div>
        <FormError id={id} error={error} />
      </div>
    );
  }
);

FormDatePicker.displayName = "FormDatePicker";
