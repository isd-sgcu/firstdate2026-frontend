import {
  PR_CHANNEL_OPTIONS,
  SGCU_AWARENESS_OPTIONS,
} from "@lib/register-options";
import { useT } from "@lib/i18n/useT";

import { RadioGroupField, SectionHeading } from "./fields";

export function StepOtherInfo() {
  const t = useT();

  return (
    <div className="flex flex-col pb-2">
      <SectionHeading>{t("register.other.heading")}</SectionHeading>

      <div className="mt-3 flex flex-col gap-6">
        <RadioGroupField
          name="sgcuAwareness"
          question={t("register.other.sgcuQuestion")}
          options={SGCU_AWARENESS_OPTIONS}
        />

        <RadioGroupField
          name="prChannel"
          question={t("register.other.prChannelQuestion")}
          options={PR_CHANNEL_OPTIONS}
        />
      </div>
    </div>
  );
}
