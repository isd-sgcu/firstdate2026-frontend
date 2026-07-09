import Calendar from "@components/home/information/calendar/Calendar";
import Map from "@components/home/information/map/Map";
import { buttonVariants } from "@components/ui/button";
import { getImageUrl } from "@lib/function";
import { cn } from "@lib/utils";

const rpkmImageUrl = getImageUrl("rpkm_logo.png");

const InformationPanel = () => {
  return (
    <div className="w-full flex flex-col items-center gap-8">
      {/* TODO: i18n  */}
      <h2 className="w-full text-2xl font-bold text-primary pb-4 text-start">
        ข้อมูลภายในงาน
      </h2>
      <Map />
      <Calendar />

      {/* TODO: i18n + Show when users are participant not staff  */}
      <a
        href="/emergency"
        className={cn(
          buttonVariants({ variant: "primaryOutline", size: "lg" }),
          "w-fit px-6 py-4 bg-(--color-background)",
        )}
      >
        ติดต่อฉุกเฉิน
      </a>

      {/*  TODO: Don't forget to change to RPKM Detail when it's time to deploy RPKM  */}
      <div className="w-full flex flex-col items-center gap-4">
        <img src={rpkmImageUrl} alt="RPKM Logo" className="w-full max-w-25" />
        {/*  TODO: i18n  */}
        <p className="text-2xl text-primary font-bold">Coming Soon</p>
      </div>
    </div>
  );
};

export default InformationPanel;
