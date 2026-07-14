import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Providers } from "@components/shared/Providers";
import { Button } from "@components/ui/button";
import { signInWithGoogle } from "@lib/api/auth";
import { useSession } from "@lib/auth/useSession";
import { useProfile } from "@lib/auth/useProfile";
import { useT } from "@lib/i18n/useT";

import logo from "@assets/images/logo_horizontal.png";

function LandingCta() {
  const t = useT();
  const session = useSession();
  const profile = useProfile();
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (profile.status === "ineligible") {
      window.location.href = "/not-eligible";
    } else if (profile.status === "ready" && profile.me.role !== "staff") {
      window.location.href = profile.me.registered ? "/" : "/register";
    }
  }, [profile.status]);

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      const { url } = await signInWithGoogle(
        `${window.location.origin}/landing`,
      );
      window.location.href = url;
    } catch {
      toast.error(t("login.error"));
      setIsSigningIn(false);
    }
  };

  const isResolving = isSigningIn || session.status !== "unauthenticated";

  return (
    <Button
      type="button"
      size="md"
      className="h-12 w-full rounded-full"
      disabled={isResolving}
      onClick={handleGoogleSignIn}
    >
      {isResolving ? t("login.loading") : t("landing.cta")}
    </Button>
  );
}

export function LandingCardContent() {
  const t = useT();

  return (
    <div className="flex h-full flex-col items-center justify-between gap-4 text-center">
      <img
        src={logo.src}
        alt="cu first date icon"
        className="w-full max-w-40"
      />

      <div className="flex flex-col gap-5 text-fd-red">
        <div className="flex flex-col">
          <p className="text-[17px]">{t("landing.eyebrow")}</p>
          <p className="text-[28px]">
            <span>{t("landing.titleLine1")}</span>
            <br />
            <span>{t("landing.titleLine2")}</span>
          </p>
        </div>
        <p className="text-2xl">{t("landing.date")}</p>
      </div>

      <Providers>
        <LandingCta />
      </Providers>
    </div>
  );
}
