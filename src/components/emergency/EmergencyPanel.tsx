import { buttonVariants } from "@components/ui/button";
import { $locale } from "@lib/i18n/locale";
import { useT } from "@lib/i18n/useT";
import { cn } from "@lib/utils";
import { useStore } from "@nanostores/react";
import { PhoneCall } from "lucide-react";
import emergencies from "./emergency.json";

export type EmergencyType = {
  nameTh: string;
  nameEn: string;
  tel1: string;
  tel2: string;
};

const EmergencyPanel = () => {
  const t = useT();
  const locale = useStore($locale);

  return (
    <>
      {/*  Header  */}
      <div className="absolute flex flex-col items-center gap-2 top-[-16cqw] left-1/2 -translate-x-1/2 text-primary">
        <PhoneCall fill="var(--fd-pink)" />
        <p className="text-2xl font-bold text-primary text-center">
          {t("emergency.title")}
        </p>
      </div>

      <div className="w-full flex flex-col gap-4">
        {emergencies.map((e) => {
          const phone1: string = e.tel1 ?? "";
          const phone2: string = e.tel2 ?? "";
          return (
            <div
              key={e.nameTh}
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-fit px-6 py-4 flex flex-col gap-2 items-center text-white whitespace-normal",
              )}
            >
              {phone1 && (
                <a
                  href={`tel:${phone1.replace(/-/g, "")}`}
                  className="flex gap-2"
                >
                  <PhoneCall fill="var(--fd-white)" />
                  <span>{phone1}</span>
                </a>
              )}
              {phone2 && (
                <a
                  href={`tel:${phone2.replace(/-/g, "")}`}
                  className="flex gap-2"
                >
                  <PhoneCall fill="var(--fd-white)" />
                  <span>{phone2}</span>
                </a>
              )}

              <p>{locale === "th" ? e.nameTh : e.nameEn}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EmergencyPanel;
