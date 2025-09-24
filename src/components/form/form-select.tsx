"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormError } from "./form-error";

interface Item {
  label: string;
  value: string;
}

interface FormSelectProps {
  id: string;
  items: Item[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  value?: string;
}

export const FormSelect = forwardRef<HTMLButtonElement, FormSelectProps>(
  (
    {
      id,
      items,
      label,
      placeholder,
      required,
      disabled,
      error,
      className,
      value = "",
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
          <Select
            value={value}
            required={required}
            disabled={disabled || pending}
          >
            <SelectTrigger ref={ref} className={cn(className, "w-[180px]")}>
              <SelectValue
                placeholder={placeholder}
                aria-describedby={`${id}-error`}
              />
            </SelectTrigger>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <FormError id={id} error={error} />
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";
