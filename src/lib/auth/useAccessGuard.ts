import { useEffect } from "react";

import { useProfile } from "./useProfile";

const STAFF_ALLOWED_PATHS = ["/", "/staff/register"];
// Reachable without a session: /landing (the login entry point) and
// /redirect (the post-event page BaseLayout's date check forces everyone to,
// auth or not).
const PUBLIC_PATHS = ["/landing", "/redirect"];

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

// Confines staff accounts to /, /staff/register, blocks everyone else from
// /staff/register, bounces ineligible accounts (neither freshman nor staff)
// to /not-eligible, and sends unauthenticated visitors to /landing. Mounted
// once in BaseLayout so it applies to every page without each page having to
// opt in.
export function useAccessGuard() {
  const profile = useProfile();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const path = normalizePath(window.location.pathname);

    if (profile.status === "ready") {
      const isStaff = profile.me.role === "staff";
      if (isStaff && !STAFF_ALLOWED_PATHS.includes(path)) {
        window.location.href = "/";
      } else if (!isStaff && path === "/staff/register") {
        window.location.href = "/";
      }
      return;
    }

    if (profile.status === "ineligible") {
      if (path !== "/landing" && path !== "/not-eligible") {
        window.location.href = "/not-eligible";
      }
      return;
    }

    if (profile.status === "unauthenticated" && !PUBLIC_PATHS.includes(path)) {
      window.location.href = "/landing";
    }
  }, [profile.status]);
}
