import { atom } from "nanostores";

import { APIError } from "@lib/client";
import { getMe, type MeResult } from "@lib/api/fd";
import { $session, refreshSession } from "./session";

export type ProfileState =
  | { status: "loading" }
  | { status: "unauthenticated" }
  | { status: "ineligible" }
  | { status: "error" }
  | { status: "ready"; me: MeResult };

export const $profile = atom<ProfileState>({ status: "loading" });

let inflight: Promise<void> | null = null;

export function refreshProfile(opts?: { soft?: boolean }): Promise<void> {
  if (!inflight) {
    inflight = (async () => {
      if ($session.get().status === "loading") {
        await refreshSession();
      }

      if ($session.get().status !== "authenticated") {
        if (!opts?.soft) $profile.set({ status: "unauthenticated" });
        return;
      }

      try {
        const me = await getMe();
        if (!me) {
          if (!opts?.soft) $profile.set({ status: "unauthenticated" });
          return;
        }
        $profile.set({ status: "ready", me });
      } catch (err) {
        if (opts?.soft) return; // background refresh: keep last good state on error
        if (err instanceof APIError && err.status === 403) {
          $profile.set({ status: "ineligible" });
        } else {
          $profile.set({ status: "error" });
        }
      }
    })().finally(() => {
      inflight = null;
    });
  }
  return inflight;
}

// Keep the freshman's status fresh without a manual reload: soft-refresh when
// the tab regains focus/visibility (throttled 3s). Never downgrades a good state.
if (typeof window !== "undefined") {
  let lastRefresh = 0;
  const softRefresh = () => {
    if (document.visibilityState !== "visible") return;
    const now = Date.now();
    if (now - lastRefresh < 3000) return;
    lastRefresh = now;
    const s = $profile.get().status;
    if (s === "ready" || s === "error" || s === "ineligible") {
      void refreshProfile({ soft: true });
    }
  };
  document.addEventListener("visibilitychange", softRefresh);
  window.addEventListener("focus", softRefresh);
}
