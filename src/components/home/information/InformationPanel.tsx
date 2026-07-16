import Calendar from "@components/home/information/calendar/Calendar";
import Map from "@components/home/information/map/Map";
import { buttonVariants } from "@components/ui/button";
import { useProfile } from "@lib/auth/useProfile";
import { appConfig } from "@lib/env";
import { getImageUrl } from "@lib/function";
import { useT } from "@lib/i18n/useT";
import { cn } from "@lib/utils";

const rpkmImageUrl = getImageUrl("rpkm_logo.png");
const rpkmRevealed = Date.now() >= appConfig.redirectAt;

const InformationPanel = () => {
  const t = useT();
  const profile = useProfile();
  const isStaff = profile.status === "ready" && profile.me.role === "staff";

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <h2 className="w-full text-2xl font-bold text-primary pb-4 text-start">
        {t("home.information.heading")}
      </h2>
      <Map />
      <Calendar />

      {!isStaff && (
        <a
          href="/emergency"
          className={cn(
            buttonVariants({ variant: "primaryOutline", size: "lg" }),
            "w-fit px-6 py-4 bg-(--color-background)",
          )}
        >
          {t("emergency.title")}
        </a>
      )}

      <div className="w-full flex flex-col items-center gap-4">
        <img src={rpkmImageUrl} alt="RPKM Logo" className="w-full max-w-25" />
        {rpkmRevealed ? (
          <a
            href={appConfig.redirectTo}
            className={cn(
              buttonVariants({ variant: "primaryOutline", size: "lg" }),
              "w-fit px-6 py-4 bg-(--color-background)",
            )}
          >
            {t("home.information.rpkmButton")}
          </a>
        ) : (
          <p className="text-2xl text-primary font-bold">
            {t("home.information.comingSoon")}
          </p>
        )}
      </div>
    </div>
  );
};

export default InformationPanel;
