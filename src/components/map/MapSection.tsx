import { Tabs, TabsList, TabsTrigger, TabsContent } from "@components/ui/tabs";
// import sectionData from "./section.json";

type SectionTabProps = {
  value: string;
  nameTh: string;
  nameEn: string;
};

const sectionTabs: SectionTabProps[] = [
  { value: "AtoD", nameTh: "ชมรม A-D", nameEn: "Club A-D" },
  { value: "E", nameTh: "องค์กร E", nameEn: "Organization E" },
  { value: "F", nameTh: "องค์กร F", nameEn: "Organization F" },
];

const MapSection = () => {
  return (
    <Tabs defaultValue={sectionTabs[0].value}>
      <TabsList className="w-full">
        {sectionTabs.map((tab) => (
          // TODO: i18n
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.nameEn}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={sectionTabs[0].value}>Content A-D</TabsContent>
      <TabsContent value={sectionTabs[1].value}>Content E</TabsContent>
      <TabsContent value={sectionTabs[2].value}>Content F</TabsContent>
    </Tabs>
  );
};

export default MapSection;
