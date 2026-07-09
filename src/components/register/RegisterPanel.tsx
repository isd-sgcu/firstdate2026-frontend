import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@components/ui/button";
import { RegisterStepper } from "./RegisterStepper";
import { StepPersonalInfo } from "./StepPersonalInfo";
import { STEP_FIELDS, TOTAL_STEPS, type RegisterFormValues } from "./types";

export function RegisterPanel() {
  const [step, setStep] = useState(1);

  const methods = useForm<RegisterFormValues>({
    mode: "onTouched",
    defaultValues: {
      prefix: "",
      firstName: "",
      lastName: "",
      faculty: "",
      studentId: "",
      phone: "",
      guardianPhone: "",
      guardianRelation: "",
    },
  });

  const { trigger, handleSubmit } = methods;

  const goNext = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (!valid) return;

    if (step < TOTAL_STEPS) {
      setStep((prev) => prev + 1);
      return;
    }

    // Final step: submit everything.
    handleSubmit((data) => {
      // TODO: send to backend once the register endpoint is ready.
      alert(JSON.stringify(data, null, 2));
    })();
  };

  return (
    <FormProvider {...methods}>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="mt-6 shrink-0 px-6">
          {/* TODO: i18n */}
          <h1 className="text-center text-3xl font-bold text-primary">
            ลงทะเบียน
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
          {step > 1 && (
            /* TODO: i18n */
            <p className="py-10 text-center text-muted-foreground">
              ขั้นตอนที่ {step} (กำลังทำครับ)
            </p>
          )}
        </form>

        <div className="shrink-0 px-6 pt-4 pb-10">
          {/* TODO: i18n */}
          <Button
            type="button"
            size="lg"
            className="h-14 w-full rounded-full text-lg"
            onClick={goNext}
          >
            {step < TOTAL_STEPS ? "ถัดไป" : "ยืนยัน"}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}
