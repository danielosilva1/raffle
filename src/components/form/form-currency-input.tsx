"use client";

import { forwardRef, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";

interface FormCurrencyInputProps {
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
      errors,
      className,
      value = "",
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    const [formattedCurrency, setFormatedCurrency] = useState("");

    const formatCurrency = (value: string) => {
      const numbers = value.replace(/\D/g, "");
      const numericValue = Number(numbers) / 100;
      const formatted = numericValue.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      setFormatedCurrency(formatted);
    };

    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      formatCurrency(value);
    };

    useEffect(() => {
      formatCurrency(value);
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
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormCurrencyInput.displayName = "FormCurrencyInput";
