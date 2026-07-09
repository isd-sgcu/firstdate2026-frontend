import { useEffect } from "react";
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
  type FieldErrors,
  type FieldPath,
} from "react-hook-form";
import { Trash2 } from "lucide-react";

import { cn } from "@lib/utils";
import { Button } from "@components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import {
  CHULA_DISTRICT_ID,
  CHULA_PROVINCE_ID,
  DISTRICTS,
  PROVINCES,
} from "@lib/thai-geo";
import { MAX_TRAVEL_LEGS, VEHICLE_OPTIONS } from "@lib/register-options";

import { controlClass, popupClass, SectionHeading } from "./fields";
import { CarIcon, HomeIcon, PinIcon } from "./icons";
import type { RegisterFormValues } from "./types";

type Name = FieldPath<RegisterFormValues>;
type Option = { value: string; label: string };

const PROVINCE_OPTIONS: Option[] = PROVINCES.map((p) => ({
  value: String(p.id),
  label: p.name,
}));
const VEHICLE_OPTS: Option[] = VEHICLE_OPTIONS.map((v) => ({
  value: v,
  label: v,
}));
const CHULA = {
  province: String(CHULA_PROVINCE_ID),
  district: String(CHULA_DISTRICT_ID),
};

const districtsOf = (provinceId: string): Option[] =>
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

function FormSelect({
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
  // value → label map so the trigger shows the label (province/district ids
  // differ from their names).
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
            onValueChange={(value) => {
              field.onChange(value ?? "");
              onAfterChange?.();
            }}
            disabled={disabled}
          >
            <SelectTrigger
              className={cn(controlClass, "w-full")}
              aria-invalid={!!error}
              disabled={disabled}
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

/** Province select + dependent district select (district resets when province
 *  changes). When `disabled`, both are locked (used for the fixed จุฬาฯ end). */
function GeoPair({
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
      <FormSelect
        name={provinceName}
        options={PROVINCE_OPTIONS}
        placeholder="เลือกจังหวัด"
        disabled={disabled}
        onAfterChange={() => setValue(districtName, "")}
      />
      <FormSelect
        name={districtName}
        options={districtsOf(provinceId)}
        placeholder="เลือกเขต/อำเภอ"
        disabled={disabled || !provinceId}
      />
    </div>
  );
}

function SubLabel({
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

// TODO: i18n — all copy in this step is hard-coded Thai.
export function StepTravelInfo() {
  const { control, setValue } = useFormContext<RegisterFormValues>();
  const residenceProvince =
    (useWatch({ name: "residenceProvince" }) as string) || "";

  const { fields, append, remove } = useFieldArray({
    control,
    name: "travelLegs",
  });

  // The final leg always ends at จุฬาฯ (กรุงเทพมหานคร / เขตปทุมวัน).
  useEffect(() => {
    const last = fields.length - 1;
    if (last < 0) return;
    setValue(`travelLegs.${last}.destProvince`, CHULA.province);
    setValue(`travelLegs.${last}.destDistrict`, CHULA.district);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields.length]);

  const addLeg = () => {
    const prevLast = fields.length - 1;
    if (prevLast >= 0) {
      setValue(`travelLegs.${prevLast}.destProvince`, "");
      setValue(`travelLegs.${prevLast}.destDistrict`, "");
    }
    append({
      vehicle: "",
      originProvince: "",
      originDistrict: "",
      destProvince: CHULA.province,
      destDistrict: CHULA.district,
    });
  };

  return (
    <div className="flex flex-col gap-6 pb-2">
      <SectionHeading>ข้อมูลการเดินทาง</SectionHeading>

      <div className="@container flex flex-col gap-3">
        {/* TODO: i18n */}
        <p className="text-base text-foreground">
          เขต/อำเภอ และจังหวัดที่ท่านอาศัยอยู่เป็นปกติ
        </p>
        <LabelRow label="จังหวัด">
          <FormSelect
            name="residenceProvince"
            options={PROVINCE_OPTIONS}
            placeholder="เลือกจังหวัด"
            onAfterChange={() => setValue("residenceDistrict", "")}
          />
        </LabelRow>
        <LabelRow label="เขต/อำเภอ">
          <FormSelect
            name="residenceDistrict"
            options={districtsOf(residenceProvince)}
            placeholder="เลือกเขต/อำเภอ"
            disabled={!residenceProvince}
          />
        </LabelRow>
      </div>

      <div className="flex flex-col gap-3">
        {/* TODO: i18n */}
        <p className="text-base text-foreground">
          รูปแบบการเดินทางมาร่วมกิจกรรม
        </p>

        <div className="flex flex-col gap-6">
          {fields.map((leg, index) => {
            const isLastLeg = index === fields.length - 1;
            const showAdd = fields.length < MAX_TRAVEL_LEGS;
            const lineToNext =
              isLastLeg && !showAdd ? null : isLastLeg ? 46 : 35;
            return (
              <div key={leg.id} className="relative pl-6">
                {lineToNext != null && (
                  <span
                    className="absolute top-2.75 left-1 w-0.5 bg-primary"
                    style={{ bottom: -lineToNext }}
                  />
                )}
                <span className="absolute top-1.5 left-0 size-2.5 rounded-full bg-fd-red" />

                <div className="flex items-center justify-between gap-2">
                  {/* TODO: i18n */}
                  <span className="font-bold text-primary">
                    ต่อที่ {index + 1}
                  </span>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="flex shrink-0 items-center gap-1 rounded-full border border-fd-red px-2.5 py-1 text-sm text-fd-red"
                    >
                      <Trash2 className="size-3.5" />
                      {/* TODO: i18n */}
                      ลบเส้นทางนี้
                    </button>
                  )}
                </div>

                <div className="mt-3">
                  <SubLabel icon={<CarIcon />}>ประเภทยานพาหนะ</SubLabel>
                  <FormSelect
                    name={`travelLegs.${index}.vehicle`}
                    options={VEHICLE_OPTS}
                    placeholder="เลือกยานพาหนะ"
                  />
                </div>

                <div className="mt-3">
                  <SubLabel icon={<HomeIcon />}>ต้นทาง</SubLabel>
                  <GeoPair
                    provinceName={`travelLegs.${index}.originProvince`}
                    districtName={`travelLegs.${index}.originDistrict`}
                  />
                </div>

                <div className="mt-3">
                  <SubLabel icon={<PinIcon />}>ปลายทาง</SubLabel>
                  <GeoPair
                    provinceName={`travelLegs.${index}.destProvince`}
                    districtName={`travelLegs.${index}.destDistrict`}
                    disabled={isLastLeg}
                  />
                </div>
              </div>
            );
          })}

          {fields.length < MAX_TRAVEL_LEGS && (
            <div className="relative pl-6">
              <span className="absolute top-4.25 left-0 size-2.5 rounded-full bg-fd-red" />
              <Button
                type="button"
                variant="primaryOutline"
                size="lg"
                className="h-11 w-full rounded-full"
                onClick={addLeg}
              >
                {/* TODO: i18n */}
                เพิ่มต่อการเดินทาง
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LabelRow({
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
