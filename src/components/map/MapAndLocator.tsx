import locatorsData from "./locators.json";
import string1 from "../../assets/images/string_1.png";
import key7 from "../../assets/images/key_7.png";

const MapAndLocator = () => {
  const locatorRows = Math.ceil(locatorsData.length / 2);

  return (
    <div className="flex flex-col gap-8">
      {/* TODO: This is still placeholder so don't forget to replace with the real one */}
      <div className="w-full h-60 bg-muted-foreground flex items-center justify-center">
        <p className="text-center font-bold">รอกราฟฟิกจาก pr</p>
      </div>

      <div className="relative w-full flex justify-end">
        {/* TODO: This locatorsData is still mock version so don't forget to replace with the real one */}
        <div
          className="grid grid-cols-2 grid-flow-col gap-x-6 gap-y-2 self-end justify-items-start text-start"
          style={{ gridTemplateRows: `repeat(${locatorRows}, auto)` }}
        >
          {locatorsData.map((locator, index) => (
            <p key={index} className="text-sm text-primary font-bold">
              {locator.code} {locator.name}
            </p>
          ))}
        </div>

        {/* String + Key */}
        <div className="absolute left-0 bottom-0 translate-y-4/5 w-[45vw] sm:w-50 -translate-x-4/10">
          <img
            src={string1.src}
            className="absolute bottom-0 scale-110 w-full h-auto translate-y-3/4 -rotate-30 translate-x-9/10"
          />
          <img src={key7.src} className="w-full h-auto rotate-240" />
        </div>
      </div>
    </div>
  );
};

export default MapAndLocator;
