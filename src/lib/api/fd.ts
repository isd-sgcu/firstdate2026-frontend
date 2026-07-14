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

export function getMe() {
  return API.get<MeResult>("/v1/fd/users/me");
}
