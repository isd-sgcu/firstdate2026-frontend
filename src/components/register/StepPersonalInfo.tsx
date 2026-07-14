import { Controller, useFormContext } from "react-hook-form";
import { useStore } from "@nanostores/react";

import { cn } from "@lib/utils";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { $locale } from "@lib/i18n/locale";
import { useT } from "@lib/i18n/useT";
import {
  FACULTIES,
  PREFIX_OPTIONS,
  RELATION_OPTIONS,
  labelOf,
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
  th: faculty.name,
  en: faculty.nameEn,
}));

// Validation lives in the zod schema (./schema); fields just declare their copy.
export function StepPersonalInfo() {
  const t = useT();

  return (
    <div className="flex flex-col pb-2">
      <SectionHeading>{t("register.personal.heading")}</SectionHeading>

      <div className="mt-3 flex flex-col gap-4">
        <NameField />

        <TextField
          name="lastName"
          label={t("register.personal.lastNameLabel")}
          placeholder={t("register.personal.lastNamePlaceholder")}
        />

        <TextField
          name="nickname"
          label={t("register.personal.nicknameLabel")}
          placeholder={t("register.personal.nicknamePlaceholder")}
        />

        <ComboboxField
          name="faculty"
          label={t("register.personal.facultyLabel")}
          placeholder={t("register.personal.facultyPlaceholder")}
          options={FACULTY_OPTIONS}
        />

        <TextField
          name="studentId"
          label={t("register.personal.studentIdLabel")}
          placeholder={t("register.personal.studentIdPlaceholder")}
          inputMode="numeric"
          disabled
        />

        <TextField
          name="phone"
          label={t("register.personal.phoneLabel")}
          placeholder={t("register.personal.phonePlaceholder")}
          inputMode="tel"
        />
      </div>

      <SectionHeading className="mt-6">
        {t("register.personal.guardianHeading")}
      </SectionHeading>

      <div className="mt-3 flex flex-col gap-4">
        <TextField
          name="guardianPhone"
          label={t("register.personal.guardianPhoneLabel")}
          placeholder={t("register.personal.guardianPhonePlaceholder")}
          inputMode="tel"
        />

        <SelectField
          name="guardianRelation"
          label={t("register.personal.guardianRelationLabel")}
          placeholder={t("register.personal.guardianRelationPlaceholder")}
          options={RELATION_OPTIONS}
        />
      </div>
    </div>
  );
}

function NameField() {
  const t = useT();
  const locale = useStore($locale);
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<RegisterFormValues>();

  return (
    <FieldBlock
      label={t("register.personal.firstNameLabel")}
      error={errors.prefix?.message ?? errors.firstName?.message}
    >
      <div className="@container">
        <div className="flex flex-col gap-3 @min-[280px]:flex-row">
          <Controller
            control={control}
            name="prefix"
            rules={{ required: t("register.validation.prefixRequired") }}
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
                  <SelectValue
                    placeholder={t("register.personal.prefixPlaceholder")}
                  />
                </SelectTrigger>
                <SelectContent className={popupClass}>
                  {PREFIX_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {labelOf(locale, option)}
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
            placeholder={t("register.personal.firstNamePlaceholder")}
            aria-invalid={!!errors.firstName}
            {...register("firstName", {
              required: t("register.validation.firstNameRequired"),
            })}
          />
        </div>
      </div>
    </FieldBlock>
  );
}
