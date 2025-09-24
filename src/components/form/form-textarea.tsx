"use client";

import { FocusEvent, forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { FormError } from "./form-error";

interface FormTextareaProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  defaultValue?: string;
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      error,
      className,
      defaultValue = "",
      onBlur,
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
          <Textarea
            onBlur={onBlur}
            defaultValue={defaultValue}
            ref={ref}
            required={required}
            name={id}
            placeholder={placeholder}
            disabled={pending || disabled}
            className={cn("text-sm px-2 py-1 h-7", className)}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormError id={id} error={error} />
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";
