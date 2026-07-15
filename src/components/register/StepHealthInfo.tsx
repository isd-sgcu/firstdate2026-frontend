import { DIETARY_OPTIONS, FOOD_ALLERGY_OPTIONS } from "@lib/register-options";
import { useT } from "@lib/i18n/useT";

import { SectionHeading } from "./fields";
import { ChecklistCard, DetailCard } from "./health-cards";

export function StepHealthInfo({
  showHeading = true,
}: { showHeading?: boolean } = {}) {
  const t = useT();

  return (
    <div className="flex flex-col pb-2">
      {showHeading && (
        <SectionHeading>{t("register.health.heading")}</SectionHeading>
      )}

      <div className="mt-3 flex flex-col gap-4">
        <ChecklistCard
          title={t("register.health.foodAllergyTitle")}
          noneSubtitle={t("register.health.foodAllergyNone")}
          options={FOOD_ALLERGY_OPTIONS}
          hasName="foodAllergyHas"
          itemsName="foodAllergyItems"
          otherName="foodAllergyOther"
          otherPlaceholder={t("register.health.foodAllergyOtherPlaceholder")}
        />

        <ChecklistCard
          title={t("register.health.dietaryTitle")}
          noneSubtitle={t("register.health.dietaryNone")}
          options={DIETARY_OPTIONS}
          hasName="dietaryHas"
          itemsName="dietaryItems"
          otherName="dietaryOther"
          otherPlaceholder={t("register.health.dietaryOtherPlaceholder")}
        />

        <DetailCard
          title={t("register.health.drugAllergyTitle")}
          noneSubtitle={t("register.health.drugAllergyNone")}
          yesSubtitle={t("register.health.drugAllergyYes")}
          hasName="drugAllergyHas"
          detailName="drugAllergyDetail"
          placeholder={t("register.health.drugAllergyPlaceholder")}
        />

        <DetailCard
          title={t("register.health.chronicDiseaseTitle")}
          noneSubtitle={t("register.health.chronicDiseaseNone")}
          yesSubtitle={t("register.health.chronicDiseaseYes")}
          hasName="chronicDiseaseHas"
          detailName="chronicDiseaseDetail"
          placeholder={t("register.health.chronicDiseasePlaceholder")}
        />
      </div>
    </div>
  );
}
