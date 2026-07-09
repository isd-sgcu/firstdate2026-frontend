import { Controller, useFormContext } from "react-hook-form";
import type { RegisterOptions } from "react-hook-form";

import { cn } from "@lib/utils";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

import type { RegisterFormValues } from "./types";

type FieldName = keyof RegisterFormValues;

export const controlClass =
  "h-11 w-full rounded-md border border-border bg-transparent px-5 text-base";

export const popupClass = "min-w-0";

export function FieldBlock({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-base font-normal text-foreground">{label}</label>
      {children}
      {error && <span className="text-sm text-destructive">{error}</span>}
    </div>
  );
}

export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("text-2xl font-bold text-primary", className)}>
      {children}
    </h2>
  );
}

export function TextField<TName extends FieldName>({
  name,
  label,
  placeholder,
  rules,
  inputMode,
}: {
  name: TName;
  label: string;
  placeholder: string;
  rules?: RegisterOptions<RegisterFormValues, TName>;
  inputMode?: React.ComponentProps<"input">["inputMode"];
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterFormValues>();

  return (
    <FieldBlock label={label} error={errors[name]?.message}>
      <Input
        className={controlClass}
        placeholder={placeholder}
        inputMode={inputMode}
        aria-invalid={!!errors[name]}
        {...register(name, rules)}
      />
    </FieldBlock>
  );
}

type SelectOption = { value: string; label: string };

export function SelectField<TName extends FieldName>({
  name,
  label,
  placeholder,
  options,
  items,
  rules,
}: {
  name: TName;
  label: string;
  placeholder: string;
  options: readonly SelectOption[] | readonly string[];
  items?: Record<string, string>;
  rules?: RegisterOptions<RegisterFormValues, TName>;
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegisterFormValues>();

  const normalized = options.map((option) =>
    typeof option === "string" ? { value: option, label: option } : option,
  );

  return (
    <FieldBlock label={label} error={errors[name]?.message}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <Select
            items={items}
            value={field.value || null}
            onValueChange={(value) => field.onChange(value ?? "")}
          >
            <SelectTrigger
              className={cn(controlClass, "w-full")}
              aria-invalid={!!errors[name]}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className={popupClass}>
              {normalized.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </FieldBlock>
  );
}
