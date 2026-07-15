import { useStore } from "@nanostores/react";

import { cn } from "@lib/utils";
import { Button } from "@components/ui/button";
import { $locale, setLocale } from "@lib/i18n/locale";

/**
 * Two-language switch. The label is the language currently in use, and clicking
 * it flips to the other one — so "TH" means you are reading Thai, press for
 * English.
 *
 * Colour comes from the caller: the drawer puts this on a cream panel, the page
 * frames put it on the red header band.
 */
export function LocaleToggle({ className }: { className?: string }) {
  const locale = useStore($locale);
  const other = locale === "th" ? "en" : "th";

  return (
    <Button
      type="button"
      variant="ghost"
      aria-label={`Switch language to ${other.toUpperCase()}`}
      className={cn(
        "size-10.5 rounded p-2 text-lg active:bg-accent",
        className,
      )}
      onClick={() => setLocale(other)}
    >
      {locale.toUpperCase()}
    </Button>
  );
}
