import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useT } from "@lib/i18n/useT";

export interface StaffRegisterPanelProps {
  isInitiallyQrScanner?: boolean;
}

export function StaffRegisterPanel({
  isInitiallyQrScanner = true,
}: StaffRegisterPanelProps) {
  const t = useT();
  return (
    <div className="flex flex-col items-center min-h-[70vh]">
      <h1 className="text-center text-2xl mt-5 text-primary leading-7">
        {t("staff.register.heading")} <br />
        CU first date
      </h1>
      <Tabs
        defaultValue={isInitiallyQrScanner ? "scanner" : "manual"}
        className="mt-7"
      >
        <TabsList className="self-center">
          <TabsTrigger value="scanner">
            {t("staff.register.tabScanner")}
          </TabsTrigger>
          <TabsTrigger value="manual">
            {t("staff.register.tabManual")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scanner">
          <CheckInQrScanner />
        </TabsContent>

        <TabsContent value="manual">
          <ManualCheckInForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CheckInQrScanner() {
  const t = useT();

  // TODO: permission flow
  return (
    <section className="mt-8 px-4">
      <Scanner
        classNames={{
          container: "border rounded",
        }}
        onScan={(result) => console.log(result)}
        onError={(error) => console.log(error?.message)}
      />

      <p className="text-primary text-xs text-center mt-12">
        {t("staff.register.refreshReminderLine1")} <br />
        {t("staff.register.refreshReminderLine2")}
      </p>
    </section>
  );
}

function ManualCheckInForm() {
  const t = useT();
  return (
    <section className="mt-12 items-center flex flex-col">
      <Input
        placeholder={t("staff.register.studentIdPlaceholder")}
        className="w-72 max-w-[75vw]"
      />
      <Button size="lg" className="w-48 mt-4 max-w-[65vw]">
        {t("staff.register.submit")}
      </Button>

      <p className="text-primary text-xs text-center mt-12">
        {t("staff.register.refreshReminderLine1")} <br />
        {t("staff.register.refreshReminderLine2")}
      </p>
    </section>
  );
}
