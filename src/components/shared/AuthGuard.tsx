import { useAccessGuard } from "@lib/auth/useAccessGuard";

export function AuthGuard() {
  useAccessGuard();
  return null;
}
