import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@components/ui/button";
import { RegisterStepper } from "./RegisterStepper";
import { StepPersonalInfo } from "./StepPersonalInfo";
import { StepHealthInfo } from "./StepHealthInfo";
import { StepOtherInfo } from "./StepOtherInfo";
import { registerSchema } from "./schema";
import { STEP_FIELDS, TOTAL_STEPS, type RegisterFormValues } from "./types";

export function RegisterPanel() {
  const [step, setStep] = useState(1);

  const methods = useForm<RegisterFormValues>({
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      // Step 1
      prefix: "",
      firstName: "",
      lastName: "",
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

  const goBack = () => setStep((prev) => Math.max(1, prev - 1));

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
          {step === 2 && <StepHealthInfo />}
          {step === 3 && <StepOtherInfo />}
          {step > 3 && (
            /* TODO: i18n */
            <p className="py-10 text-center text-muted-foreground">
              ขั้นตอนที่ {step} (กำลังทำครับ)
            </p>
          )}
        </form>

        {/* TODO: i18n */}
        <div className="flex shrink-0 gap-3 px-6 pt-4 pb-10">
          {step > 1 && (
            <Button
              type="button"
              variant="primaryOutline"
              size="lg"
              className="h-14 flex-2 rounded-full text-lg bg-primary-foreground"
              onClick={goBack}
            >
              ย้อนกลับ
            </Button>
          )}
          <Button
            type="button"
            size="lg"
            className="h-14 flex-2 rounded-full text-lg"
            onClick={goNext}
          >
            ถัดไป
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}
