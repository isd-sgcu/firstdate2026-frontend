import { buttonVariants } from "@components/ui/button";
import { appConfig } from "@lib/env";
import { getImageUrl } from "@lib/function";
import { useT } from "@lib/i18n/useT";
import { cn } from "@lib/utils";

const rpkmImageUrl = getImageUrl("rpkm_logo.png");

const RedirectPanel = () => {
  const t = useT();

  return (
    <>
      <h1 className="w-full text-3xl font-bold text-primary text-center whitespace-pre-wrap leading-relaxed">
        {t("redirect.title")}
      </h1>

      <div className="w-full flex flex-col items-center gap-8">
        <img
          src={rpkmImageUrl}
          alt="RPKM Logo"
          className="w-[80%] max-w-62.5"
        />

        <a
          href={appConfig.redirectTo}
          className={cn(
            buttonVariants({ variant: "extraRed", size: "lg" }),
            "w-fit px-6 py-4",
          )}
        >
          {t("redirect.button")}
        </a>
      </div>

      <p className="pt-6 text-xl text-center text-primary">
        {t("redirect.dateRange")}
      </p>
    </>
  );
};

export default RedirectPanel;
