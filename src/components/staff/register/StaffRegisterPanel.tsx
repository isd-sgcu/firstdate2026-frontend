import { Providers } from "@components/shared/Providers";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Switch } from "@components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Scanner, type IScannerError } from "@yudiel/react-qr-scanner";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircleIcon } from "lucide-react";
import { useT } from "@lib/i18n/useT";
import { CheckInResultDialog } from "./CheckInResultDialog";
import { Label } from "@components/ui/label";

export interface StaffRegisterPanelProps {
  isInitiallyQrScanner?: boolean;
}

export function StaffRegisterPanel({
  isInitiallyQrScanner = true,
}: StaffRegisterPanelProps) {
  const t = useT();
  return (
    <Providers>
      <div className="flex flex-col items-center min-h-[70vh]">
        <h1 className="text-center text-2xl mt-5 text-primary leading-7">
          {t("staff.register.heading")} <br />
          CU first date
        </h1>
        <Tabs
          defaultValue={isInitiallyQrScanner ? "scanner" : "manual"}
          className="mt-7 w-full"
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
    </Providers>
  );
}

function CheckInQrScanner() {
  const [paused, setPaused] = useState(false);
  const [playSound, setPlaySound] = useState(false);
  const [result, setResult] = useState<"success" | "error" | null>(null);
  // only surface the spinner once the request is slow enough to notice,
  // so fast responses don't flash it
  const [showLoading, setShowLoading] = useState(false);
  const t = useT();

  const checkIn = useMutation({
    mutationFn: (code: string) => simulateApi(code),
    onSuccess: (ok) => setResult(ok ? "success" : "error"),
    onError: () => setResult("error"),
  });

  // show loading indicator if the api took more than 400ms
  useEffect(() => {
    if (!checkIn.isPending) return;
    const timer = setTimeout(() => setShowLoading(true), 400);
    return () => {
      clearTimeout(timer);
      setShowLoading(false);
    };
  }, [checkIn.isPending]);

  // TODO: permission flow
  return (
    <section className="mt-8 w-full px-4">
      <div className="relative aspect-square w-full">
        {/* this component cause layout shift on paused, so we wrap it in another div with known size */}
        <Scanner
          onScan={(codes) => {
            const code = codes[0]?.rawValue;
            if (code) checkIn.mutate(code);
          }}
          onError={(error) => displayQrScannerError(error, t)}
          // pause while a request is in flight or a result dialog is open
          paused={paused || checkIn.isPending || result !== null}
          sound={playSound}
        />
        {showLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <LoaderCircleIcon className="size-10 animate-spin text-white" />
          </div>
        )}
      </div>

      <div className="mt-2 border border-red-500 p-3 rounded">
        <Switch checked={!paused} onCheckedChange={(it) => setPaused(!it)} />
        <Label>
          <div className="flex gap-2">
            <Switch
              checked={playSound}
              onCheckedChange={(it) => setPlaySound(it)}
            />
          </div>
          {'เล่นเสียง "ติ๊ด" ตอนสแกน'}
        </Label>
      </div>

      <p className="text-primary text-xs text-center mt-12">
        {t("staff.register.refreshReminderLine1")} <br />
        {t("staff.register.refreshReminderLine2")}
      </p>

      <CheckInResultDialog
        open={result !== null}
        onOpenChange={(open) => !open && setResult(null)}
        variant={result ?? "success"}
        // TODO: update description to {name}\n {id} once we have the api
        description={
          result === "success"
            ? t("staff.register.checkIn.successDescription")
            : result === "error"
              ? t("staff.register.checkIn.errorDescription")
              : null
        }
      />
    </section>
  );
}

const qrScannerErrorKeys = {
  "permission-denied": "staff.register.qrScannerError.permissionDenied",
  "no-camera": "staff.register.qrScannerError.noCamera",
  "in-use": "staff.register.qrScannerError.inUse",
  overconstrained: "staff.register.qrScannerError.overconstrained",
  "insecure-context": "staff.register.qrScannerError.insecureContext",
  unsupported: "staff.register.qrScannerError.unsupported",
  aborted: "staff.register.qrScannerError.aborted",
  security: "staff.register.qrScannerError.security",
  "type-error": "staff.register.qrScannerError.typeError",
  unknown: "staff.register.qrScannerError.unknown",
} as const satisfies Record<IScannerError["kind"], string>;

const refreshableErrors: Set<IScannerError["kind"]> = new Set([
  "aborted",
  "in-use",
  "overconstrained",
  "permission-denied",
  "security",
  "unknown",
  "type-error",
]);

function displayQrScannerError(
  error: IScannerError,
  t: ReturnType<typeof useT>,
) {
  toast.error(t(qrScannerErrorKeys[error.kind]), {
    duration: 60 * 1000,
    action: refreshableErrors.has(error.kind)
      ? {
          label: t("staff.register.refresh"),
          onClick: () => {
            location.reload();
          },
        }
      : undefined,
  });
}

async function simulateApi(code: string) {
  console.log("checking in", code);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Math.random() > 0.5;
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
