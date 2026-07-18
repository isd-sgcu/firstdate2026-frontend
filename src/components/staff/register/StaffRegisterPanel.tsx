import { CameraTroubleshoot } from "@components/shared/CameraTroubleshootDialog";
import { Providers } from "@components/shared/Providers";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
// import { Label } from "@components/ui/label";
// import { Switch } from "@components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { checkinRegistration } from "@lib/api/checkin";
import { APIError } from "@lib/client";
import { useT } from "@lib/i18n/useT";
import { useMutation } from "@tanstack/react-query";
import {
  Scanner,
  // useDevices,
  type IScannerError,
} from "@yudiel/react-qr-scanner";
import { LoaderCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CheckInResultDialog } from "./CheckInResultDialog";

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

interface CheckInResult {
  variant: "success" | "error";
  /** null = use the variant's default title. */
  title: string | null;
  description: string | null;
}

/**
 * Maps a /fd/checkin/registration failure to dialog content.
 * ALREADY_CHECKED_IN still shows the success dialog (with its own title) —
 * the student is registered either way.
 */
function checkInErrorToResult(
  error: unknown,
  studentId: string,
  t: ReturnType<typeof useT>,
): CheckInResult {
  if (error instanceof APIError) {
    switch (error.code) {
      case "ALREADY_CHECKED_IN":
        return {
          variant: "success",
          title: t("staff.register.checkIn.alreadyCheckedInTitle"),
          description: studentId,
        };
      case "STUDENT_NOT_FOUND":
        return {
          variant: "error",
          title: t("staff.register.checkIn.studentNotFoundTitle"),
          description: t("staff.register.checkIn.studentNotFoundDescription"),
        };
      case "FORBIDDEN_NOT_STAFF":
        return {
          variant: "error",
          title: null,
          description: t("staff.register.checkIn.notStaffDescription"),
        };
    }
  }
  return {
    variant: "error",
    title: null,
    description: t("staff.register.checkIn.errorDescription"),
  };
}

function useCheckIn() {
  const t = useT();
  const [result, setResult] = useState<CheckInResult | null>(null);

  const mutation = useMutation({
    mutationFn: (studentId: string) => checkinRegistration(studentId),
    onSuccess: (_entry, studentId) =>
      setResult({ variant: "success", title: null, description: studentId }),
    onError: (error, studentId) =>
      setResult(checkInErrorToResult(error, studentId, t)),
  });

  return { mutation, result, clearResult: () => setResult(null) };
}

function CheckInQrScanner() {
  // const devices = useDevices();
  // const [selectedDevice, setSelectedDevice] = useState<string | undefined>(
  //   undefined,
  // );

  // const [paused, setPaused] = useState(false);
  // const [playSound, setPlaySound] = useState(false);
  const { mutation: checkIn, result, clearResult } = useCheckIn();
  // only surface the spinner once the request is slow enough to notice,
  // so fast responses don't flash it
  const [showLoading, setShowLoading] = useState(false);
  const t = useT();

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
          paused={checkIn.isPending || result !== null}
          // sound={playSound}
          constraints={{
            facingMode: {
              // back camera
              ideal: "environment",
            },
            // deviceId: selectedDevice,
          }}
        />
        {showLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <LoaderCircleIcon className="size-10 animate-spin text-white" />
          </div>
        )}
      </div>
      {/*
      <div className="mt-2 border border-red-500 p-3 rounded">
        <p>debug</p>
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

        <select onChange={(e) => setSelectedDevice(e.target.value as string)}>
          <option value="">Select a camera</option>
          {devices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Camera ${device.deviceId}`}
            </option>
          ))}
        </select>
      </div>
 */}
      <div className="flex justify-center mt-4">
        <CameraTroubleshoot className="text-primary text-sm" />
      </div>

      <p className="text-primary text-xs text-center mt-8">
        {t("staff.register.refreshReminderLine1")} <br />
        {t("staff.register.refreshReminderLine2")}
      </p>

      <CheckInResultDialog
        open={result !== null}
        onOpenChange={(open) => !open && clearResult()}
        variant={result?.variant ?? "success"}
        title={result?.title}
        description={result?.description}
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

function ManualCheckInForm() {
  const t = useT();
  const [studentId, setStudentId] = useState("");
  const { mutation: checkIn, result, clearResult } = useCheckIn();

  function handleSubmit() {
    if (checkIn.isPending) return;
    if (!/^\d{10}$/.test(studentId)) {
      toast.error(t("staff.register.invalidStudentId"));
      return;
    }
    checkIn.mutate(studentId);
  }

  function handleDialogClose() {
    if (result?.variant === "success") setStudentId("");
    clearResult();
  }

  return (
    <section className="mt-12 items-center flex flex-col">
      <Input
        inputMode="numeric"
        maxLength={10}
        value={studentId}
        onChange={(e) => setStudentId(e.target.value.replace(/\D/g, ""))}
        placeholder={t("staff.register.studentIdPlaceholder")}
        className="w-72 max-w-[75vw]"
      />
      <Button
        size="lg"
        className="w-48 mt-4 max-w-[65vw]"
        disabled={checkIn.isPending}
        onClick={handleSubmit}
      >
        {checkIn.isPending && <LoaderCircleIcon className="animate-spin" />}
        {t("staff.register.submit")}
      </Button>

      <p className="text-primary text-xs text-center mt-12">
        {t("staff.register.refreshReminderLine1")} <br />
        {t("staff.register.refreshReminderLine2")}
      </p>

      <CheckInResultDialog
        open={result !== null}
        onOpenChange={(open) => !open && handleDialogClose()}
        variant={result?.variant ?? "success"}
        title={result?.title}
        description={result?.description}
      />
    </section>
  );
}
