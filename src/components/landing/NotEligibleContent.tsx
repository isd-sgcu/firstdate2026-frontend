import { buttonVariants } from "@components/ui/button";
import { useT } from "@lib/i18n/useT";
import { cn } from "@lib/utils";

import logo from "@assets/images/logo_horizontal.png";

export function NotEligibleContent() {
  const t = useT();

  return (
    <div className="flex h-full flex-col items-center justify-between gap-4 text-center">
      <img
        src={logo.src}
        alt="cu first date icon"
        className="w-full max-w-40"
      />

      <p className="text-2xl text-fd-red">{t("notEligible.title")}</p>

      <a
        href="/landing"
        className={cn(
          buttonVariants({ variant: "default", size: "md" }),
          "h-12 w-full rounded-full",
        )}
      >
        {t("notEligible.button")}
      </a>
    </div>
  );
}
