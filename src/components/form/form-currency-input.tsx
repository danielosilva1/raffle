"use client";

import { FocusEvent, forwardRef, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FormError } from "./form-error";

interface FormCurrencyInputProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  value?: string;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onChange?: (value: string) => void;
}

const formatCurrency = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  const numericValue = Number(numbers) / 100;
  return numericValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const FormCurrencyInput = forwardRef<
  HTMLInputElement,
  FormCurrencyInputProps
>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      error,
      className,
      value = "",
      onBlur,
      onChange,
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    const [formattedCurrency, setFormatedCurrency] = useState("");

    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const formatted = formatCurrency(value);
      setFormatedCurrency(formatted);
      onChange?.(formatted);
    };

    useEffect(() => {
      setFormatedCurrency(formatCurrency(value));
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
            value={formattedCurrency}
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
        <FormError id={id} error={error} />
      </div>
    );
  }
);

FormCurrencyInput.displayName = "FormCurrencyInput";
