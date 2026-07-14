import { DISTRICTS, PROVINCES } from "@lib/thai-geo";
import {
  DIETARY_OPTIONS,
  FACULTIES,
  FOOD_ALLERGY_OPTIONS,
  OTHER_OPTION,
  PR_CHANNEL_OPTIONS,
  RELATION_OPTIONS,
  SGCU_AWARENESS_OPTIONS,
  type LabeledOption,
} from "@lib/register-options";
import type { RegistrationBody, TravelLegInput } from "@lib/api/fd";

import type { RegisterFormValues } from "./types";

const provinceName = (id: string) =>
  PROVINCES.find((p) => String(p.id) === id)?.name ?? "";
const districtName = (id: string) =>
  DISTRICTS.find((d) => String(d.id) === id)?.name ?? "";
const facultyName = (code: string) =>
  FACULTIES.find((f) => f.code === code)?.name ?? code;

// Free-text backend fields (allergies/dietary/pnoSgcuAwareness/pnoReferralSource/
// emergencyContactName) store the Thai label regardless of UI locale, so the
// stored data stays consistent no matter which language the form was filled
// in — labelOf() is only for what's shown on screen.
const thLabel = (options: LabeledOption[], value: string) =>
  options.find((o) => o.value === value)?.th ?? value;

function combineChecklist(
  options: LabeledOption[],
  items: string[],
  other: string,
): string {
  const chosen = items
    .filter((item) => item !== OTHER_OPTION)
    .map((item) => thLabel(options, item));
  if (items.includes(OTHER_OPTION) && other.trim()) {
    chosen.push(other.trim());
  }
  return chosen.join(", ");
}

function mapLeg(leg: RegisterFormValues["travelLegs"][number]): TravelLegInput {
  return {
    vehicle: leg.vehicle as TravelLegInput["vehicle"],
    vehicleOther: null,
    originProvince: provinceName(leg.originProvince),
    originDistrict: districtName(leg.originDistrict),
    destinationProvince: provinceName(leg.destProvince),
    destinationDistrict: districtName(leg.destDistrict),
  };
}

export function toRegistrationBody(data: RegisterFormValues): RegistrationBody {
  const allergyParts = [
    data.foodAllergyHas
      ? combineChecklist(
          FOOD_ALLERGY_OPTIONS,
          data.foodAllergyItems,
          data.foodAllergyOther,
        )
      : "",
    data.drugAllergyHas ? data.drugAllergyDetail.trim() : "",
  ].filter(Boolean);

  const dietary = data.dietaryHas
    ? combineChecklist(DIETARY_OPTIONS, data.dietaryItems, data.dietaryOther)
    : "";

  return {
    pdpaConsent: true,
    prefix: data.prefix as RegistrationBody["prefix"],
    firstName: data.firstName,
    lastName: data.lastName,
    nickname: data.nickname,
    faculty: facultyName(data.faculty),
    phone: data.phone,
    emergencyContactName: thLabel(RELATION_OPTIONS, data.guardianRelation),
    emergencyContactPhone: data.guardianPhone,
    allergies: allergyParts.length > 0 ? allergyParts.join(" / ") : null,
    dietary: dietary || null,
    medicalNotes: data.chronicDiseaseHas
      ? data.chronicDiseaseDetail.trim() || null
      : null,
    pnoSgcuAwareness: thLabel(SGCU_AWARENESS_OPTIONS, data.sgcuAwareness),
    pnoReferralSource: thLabel(PR_CHANNEL_OPTIONS, data.prChannel),
    csoProvince: provinceName(data.residenceProvince),
    csoDistrict: districtName(data.residenceDistrict),
    travelLegs: data.travelLegs.map(mapLeg),
  };
}
