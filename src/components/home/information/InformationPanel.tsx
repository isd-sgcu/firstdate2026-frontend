import Calendar from "@components/home/information/calendar/Calendar";
import Map from "@components/home/information/map/Map";
import { buttonVariants } from "@components/ui/button";
import { getImageUrl } from "@lib/function";
import { useT } from "@lib/i18n/useT";
import { cn } from "@lib/utils";

const rpkmImageUrl = getImageUrl("rpkm_logo.png");

const InformationPanel = () => {
  const t = useT();

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <h2 className="w-full text-2xl font-bold text-primary pb-4 text-start">
        {t("home.information.heading")}
      </h2>
      <Map />
      <Calendar />

      {/* TODO: Show when users are participant not staff  */}
      <a
        href="/emergency"
        className={cn(
          buttonVariants({ variant: "primaryOutline", size: "lg" }),
          "w-fit px-6 py-4 bg-(--color-background)",
        )}
      >
        {t("emergency.title")}
      </a>

      {/*  TODO: Don't forget to change to RPKM Detail when it's time to deploy RPKM  */}
      <div className="w-full flex flex-col items-center gap-4">
        <img src={rpkmImageUrl} alt="RPKM Logo" className="w-full max-w-25" />
        <p className="text-2xl text-primary font-bold">
          {t("home.information.comingSoon")}
        </p>
      </div>
    </div>
  );
};

export default InformationPanel;
