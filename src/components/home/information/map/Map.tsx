import { getImageUrl } from "@lib/function";
import { ChevronRight } from "lucide-react";

const MapAndLocator = () => {
  const imageUrl = getImageUrl("map.png");

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex justify-between items-center">
        {/* TODO: i18n */}
        <p className="text-2xl font-bold text-primary">แผนที่</p>
        <a href="/map">
          <ChevronRight className="text-secondary" />
        </a>
      </div>

      <div className="w-full h-fit p-2 rounded-2xl flex items-center justify-center bg-secondary">
        <img src={imageUrl} alt={"Map"} className="object-contain" />
      </div>
    </div>
  );
};

export default MapAndLocator;
