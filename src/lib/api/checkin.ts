import { API } from "@lib/client";

export type CheckinEntry = {
  id: string;
  project: string;
  studentId: string;
  scannedBy: string;
  scannedAt: string;
  createdAt: string;
  updatedAt: string;
};

type SuccessResponse<T> = {
  success: true;
  data: T;
};

/** Staff-only: check a freshman in to FirstDate by their CUNET student id. */
export async function checkinRegistration(studentId: string) {
  const res = await API.post<SuccessResponse<CheckinEntry>>(
    "/v1/fd/checkin/registration",
    { student_id: studentId },
  );
  return res.data;
}
