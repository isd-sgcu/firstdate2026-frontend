import {
  Controller,
  useFormContext,
  useWatch,
  type FieldErrors,
  type FieldPath,
} from "react-hook-form";
import { Combobox } from "@base-ui/react/combobox";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { DISTRICTS, PROVINCES } from "@lib/thai-geo";

import { controlClass, popupClass } from "./fields";
import type { RegisterFormValues } from "./types";

export type Name = FieldPath<RegisterFormValues>;
export type Option = { value: string; label: string };

export const PROVINCE_OPTIONS: Option[] = PROVINCES.map((p) => ({
  value: String(p.id),
  label: p.name,
}));

export const districtsOf = (provinceId: string): Option[] =>
  DISTRICTS.filter((d) => String(d.provinceId) === provinceId).map((d) => ({
    value: String(d.id),
    label: d.name,
  }));

function errorAt(errors: FieldErrors<RegisterFormValues>, name: string) {
  const node = name
    .split(".")
    .reduce<unknown>(
      (acc, key) => (acc as Record<string, unknown>)?.[key],
      errors,
    );
  return (node as { message?: string })?.message;
}

export function FormSelect({
  name,
  options,
  placeholder,
}: {
  name: Name;
  options: Option[];
  placeholder: string;
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegisterFormValues>();
  const error = errorAt(errors, name);
  const items = Object.fromEntries(options.map((o) => [o.value, o.label]));

  return (
    <div className="flex flex-col gap-1.5">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            items={items}
            value={(field.value as string) || null}
            onValueChange={(value) => field.onChange(value ?? "")}
          >
            <SelectTrigger
              className={cn(controlClass, "w-full")}
              aria-invalid={!!error}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className={popupClass}>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <span className="text-sm text-destructive">{error}</span>}
    </div>
  );
}

export function FormCombobox({
  name,
  options,
  placeholder,
  disabled,
  onAfterChange,
}: {
  name: Name;
  options: Option[];
  placeholder: string;
  disabled?: boolean;
  onAfterChange?: () => void;
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegisterFormValues>();
  const error = errorAt(errors, name);
  const values = options.map((o) => o.value);
  const labelFor = (value: string) =>
    options.find((o) => o.value === value)?.label ?? "";

  return (
    <div className="flex flex-col gap-1.5">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Combobox.Root
            items={values}
            itemToStringLabel={labelFor}
            value={(field.value as string) || null}
            onValueChange={(value) => {
              field.onChange(value ?? "");
              onAfterChange?.();
            }}
            openOnInputClick
            disabled={disabled}
          >
            <div className="relative">
              <Combobox.Input
                placeholder={placeholder}
                aria-invalid={!!error}
                onBlur={field.onBlur}
                disabled={disabled}
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
      {error && <span className="text-sm text-destructive">{error}</span>}
    </div>
  );
}

export function GeoPair({
  provinceName,
  districtName,
  disabled,
}: {
  provinceName: Name;
  districtName: Name;
  disabled?: boolean;
}) {
  const { setValue } = useFormContext<RegisterFormValues>();
  const provinceId = (useWatch({ name: provinceName }) as string) || "";

  return (
    <div className="flex flex-col gap-3">
      <FormCombobox
        name={provinceName}
        options={PROVINCE_OPTIONS}
        placeholder="เลือกจังหวัด"
        disabled={disabled}
        onAfterChange={() => setValue(districtName, "")}
      />
      <FormCombobox
        name={districtName}
        options={districtsOf(provinceId)}
        placeholder="เลือกเขต/อำเภอ"
        disabled={disabled || !provinceId}
      />
    </div>
  );
}

export function SubLabel({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-2 flex items-center gap-1.5 text-base text-foreground">
      <span className="text-[20px] text-foreground">{icon}</span>
      {/* TODO: i18n */}
      {children}
    </div>
  );
}

export function LabelRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 @min-[300px]:flex-row @min-[300px]:items-start @min-[300px]:gap-3">
      {/* TODO: i18n */}
      <span className="text-base text-foreground @min-[300px]:w-20 @min-[300px]:shrink-0 @min-[300px]:pt-2.5">
        {label}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
