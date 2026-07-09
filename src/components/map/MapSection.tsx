import { Tabs, TabsList, TabsTrigger, TabsContent } from "@components/ui/tabs";
import sectionData from "./section.json";

const STAFF_BLOCKS = ["A5", "A6"];

type SectionTabProps = {
  value: string;
  nameTh: string;
  nameEn: string;
};

const sectionTabs: SectionTabProps[] = Object.entries(sectionData).map(
  ([value, section]) => ({
    value,
    nameTh: section.tabNameTh,
    nameEn: section.tabNameEn,
  }),
);

const DataSectionAtoD = () => {
  const data = sectionData.AtoD.data;

  return (
    <div className="grid grid-flow-col grid-rows-8 gap-x-1 gap-y-2">
      {data.map((item) => (
        <div
          key={item.code}
          className={`flex min-w-0 flex-col text-center text-secondary ${
            item.code.startsWith("A")
              ? "mr-3"
              : item.code.startsWith("D")
                ? "ml-3"
                : ""
          }`}
        >
          <span
            className={`w-full py-4 font-bold ${STAFF_BLOCKS.includes(item.code) ? "bg-muted-foreground" : "bg-[#97E3EF]"}`}
          >
            {item.code}
          </span>
          {/* TODO: i18n */}
          <span className="text-sm break-all">{item.nameTh}</span>
        </div>
      ))}
    </div>
  );
};

const DataSectionE = () => {
  const data = sectionData.E.data;
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-flow-col grid-rows-1 gap-x-1">
        {data.map((item) => (
          <span
            key={item.code}
            className="w-auto text-muted py-2 text-center font-bold bg-[#ff716d]"
          >
            {item.code}
          </span>
        ))}
      </div>

      {/* Name */}
      <div className="flex flex-col gap-4">
        {data.map((item) => {
          return (
            <div className="flex gap-4 items-center" key={item.code}>
              <span className="font-bold text-secondary">{item.code}</span>
              {/* TODO: i18n */}
              <span className="text-secondary">{item.nameTh}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DataSectionF = () => {
  const data = sectionData.F.data;
  return (
    <div className="flex flex-col gap-4">
      {data.map((item) => {
        return (
          <div className="flex gap-4 items-center" key={item.code}>
            <span className="font-bold text-secondary p-2 bg-[#fbd473]">
              {item.code}
            </span>
            {/* TODO: i18n */}
            <span className="text-secondary">{item.nameTh}</span>
          </div>
        );
      })}
    </div>
  );
};

const sectionContent: Record<string, () => React.JSX.Element> = {
  AtoD: DataSectionAtoD,
  E: DataSectionE,
  F: DataSectionF,
};

const MapSection = () => {
  return (
    <Tabs defaultValue={sectionTabs[0].value}>
      <TabsList className="w-full mb-4">
        {sectionTabs.map((tab) => (
          // TODO: i18n
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.nameEn}
          </TabsTrigger>
        ))}
      </TabsList>
      {sectionTabs.map((tab) => {
        const Content = sectionContent[tab.value];
        return (
          <TabsContent key={tab.value} value={tab.value}>
            <Content />
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default MapSection;
