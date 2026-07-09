import { Controller, useFormContext } from "react-hook-form";

import { cn } from "@lib/utils";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import {
  FACULTIES,
  PREFIX_OPTIONS,
  RELATION_OPTIONS,
} from "@lib/register-options";

import {
  ComboboxField,
  controlClass,
  FieldBlock,
  popupClass,
  SectionHeading,
  SelectField,
  TextField,
} from "./fields";
import type { RegisterFormValues } from "./types";

const FACULTY_OPTIONS = FACULTIES.map((faculty) => ({
  value: faculty.code,
  label: faculty.name,
}));

const PHONE_RULES = {
  required: "กรุณากรอกเบอร์โทรศัพท์",
  pattern: {
    value: /^0\d{9}$/,
    message: "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก",
  },
};

export function StepPersonalInfo() {
  // TODO: i18n — every heading / label / placeholder / validation message below
  return (
    <div className="flex flex-col pb-2">
      <SectionHeading>ข้อมูลส่วนตัว</SectionHeading>

      <div className="mt-3 flex flex-col gap-4">
        <NameField />

        <TextField
          name="lastName"
          label="นามสกุล"
          placeholder="กรอกนามสกุล..."
          rules={{ required: "กรุณากรอกนามสกุล" }}
        />

        <ComboboxField
          name="faculty"
          label="คณะ"
          placeholder="คณะ"
          options={FACULTY_OPTIONS}
          rules={{ required: "กรุณาเลือกคณะ" }}
        />

        <TextField
          name="studentId"
          label="เลขประจำตัวนิสิต"
          placeholder="กรอกเลขประจำตัวนิสิต..."
          inputMode="numeric"
          rules={{
            required: "กรุณากรอกเลขประจำตัวนิสิต",
            pattern: {
              value: /^69\d{8}$/,
              message: "เลขประจำตัวนิสิตต้องขึ้นต้นด้วย 69 และมี 10 หลัก",
            },
          }}
        />

        <TextField
          name="phone"
          label="เบอร์โทรศัพท์"
          placeholder="กรอกเบอร์โทรศัพท์..."
          inputMode="tel"
          rules={{ ...PHONE_RULES }}
        />
      </div>

      <SectionHeading className="mt-6">ข้อมูลผู้ปกครอง</SectionHeading>

      <div className="mt-3 flex flex-col gap-4">
        <TextField
          name="guardianPhone"
          label="เบอร์โทรศัพท์ผู้ปกครอง"
          placeholder="กรอกเบอร์โทรศัพท์ผู้ปกครอง..."
          inputMode="tel"
          rules={{
            ...PHONE_RULES,
            required: "กรุณากรอกเบอร์โทรศัพท์ผู้ปกครอง",
          }}
        />

        <SelectField
          name="guardianRelation"
          label="ความสัมพันธ์"
          placeholder="ความสัมพันธ์"
          options={RELATION_OPTIONS}
          rules={{ required: "กรุณาเลือกความสัมพันธ์" }}
        />
      </div>
    </div>
  );
}

function NameField() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<RegisterFormValues>();

  return (
    <FieldBlock
      label="ชื่อจริง"
      error={errors.prefix?.message ?? errors.firstName?.message}
    >
      <div className="@container">
        <div className="flex flex-col gap-3 @min-[280px]:flex-row">
          <Controller
            control={control}
            name="prefix"
            rules={{ required: "กรุณาเลือกคำนำหน้า" }}
            render={({ field }) => (
              <Select
                value={field.value || null}
                onValueChange={(value) => field.onChange(value ?? "")}
              >
                <SelectTrigger
                  className={cn(
                    controlClass,
                    "@min-[280px]:w-32 @min-[280px]:shrink-0",
                  )}
                  aria-invalid={!!errors.prefix}
                >
                  <SelectValue placeholder="คำนำหน้า" />
                </SelectTrigger>
                <SelectContent className={popupClass}>
                  {PREFIX_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <Input
            className={cn(
              controlClass,
              "@min-[280px]:min-w-37.5 @min-[280px]:flex-1",
            )}
            placeholder="กรอกชื่อจริง..."
            aria-invalid={!!errors.firstName}
            {...register("firstName", { required: "กรุณากรอกชื่อจริง" })}
          />
        </div>
      </div>
    </FieldBlock>
  );
}
