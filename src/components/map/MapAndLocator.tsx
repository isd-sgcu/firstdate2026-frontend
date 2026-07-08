import locatorsData from "./locators.json";

const MapAndLocator = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* TODO: This is still placeholder so don't forget to replace with the real one */}
      <div className="w-full h-60 bg-muted-foreground flex items-center justify-center">
        <p className="text-center font-bold">รอกราฟฟิกจาก pr</p>
      </div>

      {/* TODO: This locatorsData is still mock version so don't forget to replace with the real one */}
      <div className="grid grid-rows-4 grid-flow-col gap-x-6 gap-y-2 self-end justify-items-start text-start">
        {locatorsData.locators.map((locator, index) => (
          <p key={index} className="text-sm text-primary font-bold">
            {locator.code} {locator.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default MapAndLocator;
