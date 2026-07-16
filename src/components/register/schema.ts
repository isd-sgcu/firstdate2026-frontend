import { z } from "zod";

import { OTHER_OPTION, PREFIX_VALUES } from "@lib/register-options";
import type { Translator } from "@lib/i18n/useT";

export function buildRegisterSchema(t: Translator) {
  const required = (message: string) => z.string().trim().min(1, message);
  const phone = z
    .string()
    .regex(/^0\d{9}$/, t("register.validation.phoneInvalid"));

  return z
    .object({
      // Step 1 — ข้อมูลส่วนตัว
      prefix: z.enum(PREFIX_VALUES, t("register.validation.prefixRequired")),
      firstName: required(t("register.validation.firstNameRequired")),
      lastName: required(t("register.validation.lastNameRequired")),
      nickname: required(t("register.validation.nicknameRequired")),
      faculty: required(t("register.validation.facultyRequired")),
      studentId: z
        .string()
        .regex(/^69\d{8}$/, t("register.validation.studentIdInvalid")),
      phone,
      guardianPhone: phone,
      guardianRelation: required(
        t("register.validation.guardianRelationRequired"),
      ),

      // Step 2 — ข้อมูลสุขภาพ
      foodAllergyHas: z.boolean(),
      foodAllergyItems: z.array(z.string()),
      foodAllergyOther: z.string(),
      dietaryHas: z.boolean(),
      dietaryItems: z.array(z.string()),
      dietaryOther: z.string(),
      drugAllergyHas: z.boolean(),
      drugAllergyDetail: z.string(),
      chronicDiseaseHas: z.boolean(),
      chronicDiseaseDetail: z.string(),

      // Step 3 — ข้อมูลอื่น ๆ
      sgcuAwareness: required(t("register.validation.choiceRequired")),
      prChannel: required(t("register.validation.choiceRequired")),

      // Step 4 — ข้อมูลการเดินทาง
      residenceProvince: required(t("register.validation.provinceRequired")),
      residenceDistrict: required(t("register.validation.districtRequired")),
      travelLegs: z
        .array(
          z.object({
            vehicle: required(t("register.validation.vehicleRequired")),
            originProvince: required(t("register.validation.provinceRequired")),
            originDistrict: required(t("register.validation.districtRequired")),
            // The final leg's destination is fixed to จุฬาฯ, so it isn't
            // required per-field; intermediate legs are checked in the
            // superRefine below.
            destProvince: z.string(),
            destDistrict: z.string(),
          }),
        )
        .min(1)
        .max(4),
    })
    .superRefine((v, ctx) => {
      const need = (when: boolean, path: string, message: string) => {
        if (when) ctx.addIssue({ code: "custom", path: [path], message });
      };

      const checklists = [
        ["foodAllergyHas", "foodAllergyItems", "foodAllergyOther"],
        ["dietaryHas", "dietaryItems", "dietaryOther"],
      ] as const;
      for (const [has, items, other] of checklists) {
        if (!v[has]) continue;
        need(v[items].length === 0, items, t("register.validation.atLeastOne"));
        need(
          v[items].includes(OTHER_OPTION) && v[other].trim() === "",
          other,
          t("register.validation.specifyMore"),
        );
      }

      const details = [
        [
          "drugAllergyHas",
          "drugAllergyDetail",
          t("register.validation.drugAllergyRequired"),
        ],
        [
          "chronicDiseaseHas",
          "chronicDiseaseDetail",
          t("register.validation.chronicDiseaseRequired"),
        ],
      ] as const;
      for (const [has, detail, message] of details) {
        need(v[has] && v[detail].trim() === "", detail, message);
      }

      // Every leg except the last must have a chosen destination (the last
      // leg always ends at จุฬาฯ, set automatically by the UI).
      v.travelLegs.forEach((leg, i) => {
        if (i === v.travelLegs.length - 1) return;
        if (leg.destProvince.trim() === "") {
          ctx.addIssue({
            code: "custom",
            path: ["travelLegs", i, "destProvince"],
            message: t("register.validation.provinceRequired"),
          });
        }
        if (leg.destDistrict.trim() === "") {
          ctx.addIssue({
            code: "custom",
            path: ["travelLegs", i, "destDistrict"],
            message: t("register.validation.districtRequired"),
          });
        }
      });
    });
}

export type RegisterFormValues = z.infer<
  ReturnType<typeof buildRegisterSchema>
>;
