import { buttonVariants } from "@components/ui/button";
import { useT } from "@lib/i18n/useT";
import { cn } from "@lib/utils";

import logo from "@assets/images/logo_horizontal.png";

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

      {/* TODO: replace with sso or redirect or sth after backend is merged */}
      <a
        href="/login"
        className={cn(
          buttonVariants({ variant: "default", size: "md" }),
          "h-12 w-full rounded-full",
        )}
      >
        {t("landing.cta")}
      </a>
    </div>
  );
}
