import type { ProfileResult } from "@lib/api/fd";

import { EditProfilePanel } from "./EditProfilePanel";

// Dev-only mock so /edit-profile/preview renders without an auth session.
const mock: ProfileResult = {
  user: {
    id: "u1",
    studentId: "6900000000",
    prefix: "ms",
    firstName: "สมชาย",
    lastName: "ไมตรีจิต",
    nickname: "ชาย",
    faculty: "คณะสถาปัตยกรรมศาสตร์",
    year: null,
    phone: "0000000000",
    emergencyContactName: "มารดา",
    emergencyContactPhone: "0000000000",
    allergies: "อาหารทะเล, ไก่ย่าง / Cefspan",
    dietary: "ฮาลาล, มังสวิรัติ",
    medicalNotes: null,
    pnoSgcuAwareness: null,
    csoDistrict: "เมืองระยอง",
    csoProvince: "ระยอง",
    bottle: null,
  },
  registration: null,
  travelLegs: [
    {
      seq: 1,
      vehicle: "transit",
      vehicleOther: null,
      originProvince: "นครราชสีมา",
      originDistrict: "เมืองนครราชสีมา",
      destinationProvince: "กรุงเทพมหานคร",
      destinationDistrict: "เขตปทุมวัน",
    },
    {
      seq: 2,
      vehicle: "bus",
      vehicleOther: null,
      originProvince: "นครราชสีมา",
      originDistrict: "เมืองนครราชสีมา",
      destinationProvince: "กรุงเทพมหานคร",
      destinationDistrict: "เขตปทุมวัน",
    },
  ],
};

export function EditProfilePreview() {
  return <EditProfilePanel previewProfile={mock} />;
}
