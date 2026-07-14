import { Button } from "@components/ui/button";
import { logout } from "@lib/auth/session";
import { useT } from "@lib/i18n/useT";

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

      <Button
        type="button"
        size="md"
        className="h-12 w-full rounded-full"
        onClick={() =>
          logout().then(() => {
            window.location.href = "/landing";
          })
        }
      >
        {t("notEligible.button")}
      </Button>
    </div>
  );
}
