import { z } from "zod";

import { OTHER_OPTION } from "@lib/register-options";

// TODO: i18n — validation messages are hard-coded Thai copy.

const required = (message: string) => z.string().trim().min(1, message);
const phone = (message = "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก") =>
  z.string().regex(/^0\d{9}$/, message);

/** The whole registration form. Field-level checks live here; cross-field rules
 *  (e.g. "if มี then require a detail") are in the `superRefine` below. */
export const registerSchema = z
  .object({
    // Step 1 — ข้อมูลส่วนตัว
    prefix: required("กรุณาเลือกคำนำหน้า"),
    firstName: required("กรุณากรอกชื่อจริง"),
    lastName: required("กรุณากรอกนามสกุล"),
    faculty: required("กรุณาเลือกคณะ"),
    // ปี 2569: รหัสนิสิตชั้นปี 1 ขึ้นต้นด้วย 69 และมี 10 หลัก
    studentId: z
      .string()
      .regex(/^69\d{8}$/, "เลขประจำตัวนิสิตต้องขึ้นต้นด้วย 69 และมี 10 หลัก"),
    phone: phone(),
    guardianPhone: phone(),
    guardianRelation: required("กรุณาเลือกความสัมพันธ์"),

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
  })
  .superRefine((values, ctx) => {
    const requireDetail = (
      has: boolean,
      detail: string,
      path: string,
      message: string,
    ) => {
      if (has && detail.trim() === "") {
        ctx.addIssue({ code: "custom", path: [path], message });
      }
    };

    const requireChecklist = (
      has: boolean,
      items: string[],
      other: string,
      itemsPath: string,
      otherPath: string,
    ) => {
      if (!has) return;
      if (items.length === 0) {
        ctx.addIssue({
          code: "custom",
          path: [itemsPath],
          message: "กรุณาเลือกอย่างน้อย 1 รายการ",
        });
      }
      if (items.includes(OTHER_OPTION) && other.trim() === "") {
        ctx.addIssue({
          code: "custom",
          path: [otherPath],
          message: "กรุณาระบุเพิ่มเติม",
        });
      }
    };

    requireChecklist(
      values.foodAllergyHas,
      values.foodAllergyItems,
      values.foodAllergyOther,
      "foodAllergyItems",
      "foodAllergyOther",
    );
    requireChecklist(
      values.dietaryHas,
      values.dietaryItems,
      values.dietaryOther,
      "dietaryItems",
      "dietaryOther",
    );
    requireDetail(
      values.drugAllergyHas,
      values.drugAllergyDetail,
      "drugAllergyDetail",
      "กรุณากรอกยาที่แพ้",
    );
    requireDetail(
      values.chronicDiseaseHas,
      values.chronicDiseaseDetail,
      "chronicDiseaseDetail",
      "กรุณากรอกโรคประจำตัว",
    );
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
