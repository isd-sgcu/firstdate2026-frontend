import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@components/ui/button";
import { Providers } from "@components/shared/Providers";
import { RegisterStepper } from "./RegisterStepper";
import { StepPersonalInfo } from "./StepPersonalInfo";
import { StepHealthInfo } from "./StepHealthInfo";
import { StepOtherInfo } from "./StepOtherInfo";
import { StepTravelInfo } from "./StepTravelInfo";
import { StepPdpa } from "./StepPdpa";
import { buildRegisterSchema } from "./schema";
import { toRegistrationBody } from "./toRegistrationBody";
import { CHULA_DISTRICT_ID, CHULA_PROVINCE_ID } from "@lib/thai-geo";
import { APIError } from "@lib/client";
import { registerFd } from "@lib/api/fd";
import { useSession } from "@lib/auth/useSession";
import { useT } from "@lib/i18n/useT";
import { STEP_FIELDS, TOTAL_STEPS, type RegisterFormValues } from "./types";

// Mirrors the backend's deriveStudentId (src/utils/student.ts) so the field
// shown here always matches the studentId the server actually uses — the
// server derives it from the authenticated email itself, this input is never
// sent (see toRegistrationBody.ts).
const deriveStudentId = (email: string) =>
  (email.split("@")[0] || email).toLowerCase();

function submitErrorKey(status: number) {
  switch (status) {
    case 400:
      return "register.error.badRequest" as const;
    case 403:
      return "register.error.forbidden" as const;
    case 409:
      return "register.error.alreadyRegistered" as const;
    default:
      return "register.error.generic" as const;
  }
}

export function RegisterPanel() {
  const t = useT();
  const [step, setStep] = useState(1);
  const [showPdpa, setShowPdpa] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = useMemo(() => buildRegisterSchema(t), [t]);

  const methods = useForm<RegisterFormValues>({
    mode: "onTouched",
    resolver: zodResolver(schema),
    defaultValues: {
      // Step 1
      prefix: undefined,
      firstName: "",
      lastName: "",
      nickname: "",
      faculty: "",
      studentId: "",
      phone: "",
      guardianPhone: "",
      guardianRelation: "",
      // Step 2
      foodAllergyHas: false,
      foodAllergyItems: [],
      foodAllergyOther: "",
      dietaryHas: false,
      dietaryItems: [],
      dietaryOther: "",
      drugAllergyHas: false,
      drugAllergyDetail: "",
      chronicDiseaseHas: false,
      chronicDiseaseDetail: "",
      // Step 3
      sgcuAwareness: "",
      prChannel: "",
      // Step 4 — first leg ends at จุฬาฯ by default
      residenceProvince: "",
      residenceDistrict: "",
      travelLegs: [
        {
          vehicle: "",
          originProvince: "",
          originDistrict: "",
          destProvince: String(CHULA_PROVINCE_ID),
          destDistrict: String(CHULA_DISTRICT_ID),
        },
      ],
    },
  });

  const { trigger, handleSubmit, setValue } = methods;

  const session = useSession();
  const email = session.status === "authenticated" ? session.user.email : null;
  useEffect(() => {
    if (email) setValue("studentId", deriveStudentId(email));
  }, [email, setValue]);

  const goNext = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (!valid) return;

    if (step < TOTAL_STEPS) {
      setStep((prev) => prev + 1);
      return;
    }

    setShowPdpa(true);
  };

  const goBack = () => setStep((prev) => Math.max(1, prev - 1));

  const submitAll = () =>
    handleSubmit(async (data) => {
      setIsSubmitting(true);
      try {
        await registerFd(toRegistrationBody(data));
        window.location.href = "/";
      } catch (err) {
        const key =
          err instanceof APIError
            ? submitErrorKey(err.status)
            : "register.error.generic";
        toast.error(t(key));
        setIsSubmitting(false);
      }
    })();

  if (showPdpa) {
    return (
      <Providers>
        <FormProvider {...methods}>
          <StepPdpa onConsent={submitAll} isSubmitting={isSubmitting} />
        </FormProvider>
      </Providers>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="mt-6 shrink-0 px-6">
          <h1 className="text-center text-3xl font-bold text-primary">
            {t("register.heading")}
          </h1>
          <div className="mt-4">
            <RegisterStepper current={step} total={TOTAL_STEPS} />
          </div>
        </div>

        <form
          onSubmit={(event) => event.preventDefault()}
          noValidate
          className="no-scrollbar mt-6 min-h-0 flex-1 overflow-y-auto px-6"
        >
          {step === 1 && <StepPersonalInfo />}
          {step === 2 && <StepHealthInfo />}
          {step === 3 && <StepOtherInfo />}
          {step === 4 && <StepTravelInfo />}
        </form>

        <div className="flex shrink-0 gap-3 px-6 pt-4 pb-10">
          {step > 1 && (
            <Button
              type="button"
              variant="primaryOutline"
              size="lg"
              className="h-14 flex-2 rounded-full text-lg bg-primary-foreground"
              onClick={goBack}
            >
              {t("register.back")}
            </Button>
          )}
          <Button
            type="button"
            size="lg"
            className="h-14 flex-2 rounded-full text-lg"
            onClick={goNext}
          >
            {t("register.next")}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}
