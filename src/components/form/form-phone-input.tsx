"use client";

import { forwardRef, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";

interface FormPhoneInputProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  value?: string;
  onBlur?: () => void;
}

export const FormPhoneInput = forwardRef<HTMLInputElement, FormPhoneInputProps>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      errors,
      className,
      value = "",
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    const [formattedPhone, setFormatedPhone] = useState("");

    const formatPhone = (phone: string) => {
      const numbers = phone.replace(/\D/g, "");
      const formatted = numbers
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 15);

      setFormatedPhone(formatted);
    };

    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      formatPhone(value);
    };

    useEffect(() => {
      formatPhone(value);
    }, [value]);

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

          <Input
            onBlur={onBlur}
            value={formattedPhone}
            ref={ref}
            required={required}
            name={id}
            placeholder={placeholder}
            type="text"
            disabled={pending || disabled}
            className={cn("text-sm px-2 py-1 h-7", className)}
            aria-describedby={`${id}-error`}
            onChange={onChangeValue}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormPhoneInput.displayName = "FormPhoneInput";
