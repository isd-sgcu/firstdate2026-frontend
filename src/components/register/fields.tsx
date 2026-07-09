import { Controller, useFormContext } from "react-hook-form";
import { Combobox } from "@base-ui/react/combobox";
import { ChevronDownIcon } from "lucide-react";

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

/** Only the string-valued fields — these inputs/selects bind to a string. */
type FieldName = {
  [K in keyof RegisterFormValues]: RegisterFormValues[K] extends string
    ? K
    : never;
}[keyof RegisterFormValues];

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
  inputMode,
}: {
  name: TName;
  label: string;
  placeholder: string;
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
        {...register(name)}
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
}: {
  name: TName;
  label: string;
  placeholder: string;
  options: readonly SelectOption[] | readonly string[];
  items?: Record<string, string>;
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

/** A searchable single-select (base-ui Combobox) wired to the shared form.
 *  Good when there are many options — the user types to filter by label. */
export function ComboboxField<TName extends FieldName>({
  name,
  label,
  placeholder,
  options,
}: {
  name: TName;
  label: string;
  placeholder: string;
  options: readonly SelectOption[];
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegisterFormValues>();

  const values = options.map((option) => option.value);
  const labelFor = (value: string) =>
    options.find((option) => option.value === value)?.label ?? "";

  return (
    <FieldBlock label={label} error={errors[name]?.message}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Combobox.Root
            items={values}
            itemToStringLabel={labelFor}
            value={field.value || null}
            onValueChange={(value) => field.onChange(value ?? "")}
            openOnInputClick
          >
            <div className="relative">
              <Combobox.Input
                placeholder={placeholder}
                aria-invalid={!!errors[name]}
                onBlur={field.onBlur}
                className={cn(controlClass, "pr-9")}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                <ChevronDownIcon className="size-4" />
              </span>
            </div>
            <Combobox.Portal>
              <Combobox.Positioner sideOffset={4} className="isolate z-50">
                <Combobox.Popup className="max-h-(--available-height) w-(--anchor-width) overflow-y-auto rounded-lg border bg-popover p-1 text-popover-foreground shadow-xl ring-1 ring-foreground/10">
                  <Combobox.Empty className="px-2 py-2 text-sm text-muted-foreground">
                    ไม่พบผลลัพธ์
                  </Combobox.Empty>
                  <Combobox.List>
                    {(item: string) => (
                      <Combobox.Item
                        key={item}
                        value={item}
                        className="flex cursor-default items-center rounded-md px-2 py-1.5 text-base outline-none select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-selected:font-bold"
                      >
                        {labelFor(item)}
                      </Combobox.Item>
                    )}
                  </Combobox.List>
                </Combobox.Popup>
              </Combobox.Positioner>
            </Combobox.Portal>
          </Combobox.Root>
        )}
      />
    </FieldBlock>
  );
}

export function YesNoToggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  const segment = (active: boolean) =>
    cn(
      "rounded-full px-4 py-2 text-sm leading-none transition-colors",
      active ? "bg-primary font-bold text-primary-foreground" : "text-primary",
    );

  return (
    <div className="inline-flex shrink-0 items-center rounded-full border border-primary">
      {/* TODO: i18n */}
      <button
        type="button"
        onClick={() => onChange(false)}
        className={segment(!value)}
      >
        ไม่มี
      </button>
      {/* TODO: i18n */}
      <button
        type="button"
        onClick={() => onChange(true)}
        className={segment(value)}
      >
        มี
      </button>
    </div>
  );
}
