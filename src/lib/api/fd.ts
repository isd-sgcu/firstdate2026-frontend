import { API } from "@lib/client";

export type MeResult = {
  id: string | null;
  studentId: string;
  firstName: string;
  lastName: string;
  faculty: string | null;
  role: string;
  registered: boolean;
};

type SuccessResponse<T> = {
  success: true;
  data: T;
};

export async function getMe() {
  const res = await API.get<SuccessResponse<MeResult>>("/v1/fd/users/me");
  return res.data;
}
