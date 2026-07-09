export type RegisterFormValues = {
  // Step 1 — ข้อมูลส่วนตัว
  prefix: string;
  firstName: string;
  lastName: string;
  faculty: string;
  studentId: string;
  phone: string;
  // Step 1 — ข้อมูลผู้ปกครอง
  guardianPhone: string;
  guardianRelation: string;
};

export const TOTAL_STEPS = 4;

/** Field names that belong to each step, used to scope validation per step. */
export const STEP_FIELDS: Record<number, (keyof RegisterFormValues)[]> = {
  1: [
    "prefix",
    "firstName",
    "lastName",
    "faculty",
    "studentId",
    "phone",
    "guardianPhone",
    "guardianRelation",
  ],
  2: [],
  3: [],
  4: [],
};
