import { getImageUrl } from "@lib/function";
import { useT } from "@lib/i18n/useT";
import MapSection from "./MapSection";
import { MapIcon } from "lucide-react";

const mapImageUrl = getImageUrl("map.png");

const MapPanel = () => {
  const t = useT();

  return (
    <>
      {/* Header  */}
      <div className="absolute flex flex-col items-center gap-2 top-[-16cqw] left-1/2 -translate-x-1/2 text-primary">
        <MapIcon />
        <p className="text-2xl font-bold text-primary text-center">
          {t("map.title")}
        </p>
      </div>

      {/* Map  */}
      <div className="w-full h-auto my-4 rounded-2xl flex items-center justify-center bg-secondary">
        <img
          src={mapImageUrl}
          alt={"Map"}
          className="object-contain w-full h-full"
        />
      </div>

      {/* Map Section  */}
      <MapSection />
    </>
  );
};

export default MapPanel;
