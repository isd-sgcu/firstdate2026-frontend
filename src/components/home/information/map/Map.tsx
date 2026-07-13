import { getImageUrl } from "@lib/function";
import { useT } from "@lib/i18n/useT";
import { ChevronRight } from "lucide-react";

const mapImageUrl = getImageUrl("map.png");

const MapAndLocator = () => {
  const t = useT();

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex justify-between items-center">
        <p className="text-2xl font-bold text-primary">{t("map.title")}</p>
        <a href="/map">
          <ChevronRight className="text-secondary" />
        </a>
      </div>

      <div className="w-full h-fit p-2 rounded-2xl flex items-center justify-center bg-secondary">
        <img src={mapImageUrl} alt={"Map"} className="object-contain" />
      </div>
    </div>
  );
};

export default MapAndLocator;
