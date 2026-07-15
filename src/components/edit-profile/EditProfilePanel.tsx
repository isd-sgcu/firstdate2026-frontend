import { useQuery } from "@tanstack/react-query";

import { Providers } from "@components/shared/Providers";
import { getProfile, type ProfileResult } from "@lib/api/fd";
import { useT } from "@lib/i18n/useT";

import { AvatarEditor } from "./AvatarEditor";
import { HealthCard, PersonalCard, TravelCard } from "./SummaryCards";

function Overview({ previewProfile }: { previewProfile?: ProfileResult }) {
  const t = useT();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    // Preview mode injects mock data and skips the (auth-gated) fetch.
    enabled: !previewProfile,
    initialData: previewProfile,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <p className="text-muted-foreground">{t("editProfile.loading")}</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <p className="text-destructive">{t("editProfile.loadError")}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <h1 className="shrink-0 text-center text-3xl font-bold text-primary mt-4">
        {t("editProfile.heading")}
      </h1>

      {/* Body scrolls; the bottom spacer reserves the bottom-cap area so
          content clips above it (tucks under the frame) instead of painting
          over the cap — the fixed-height frame stays like /register. */}
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-5 pt-2">
        <div className="mt-2">
          <AvatarEditor />
        </div>
        <PersonalCard profile={data} />
        <HealthCard profile={data} />
        <TravelCard profile={data} />
        <div className="h-2" />
      </div>

      <div aria-hidden className="h-[34cqw] shrink-0" />
    </div>
  );
}

export function EditProfilePanel({
  previewProfile,
}: {
  previewProfile?: ProfileResult;
}) {
  return (
    <Providers>
      <Overview previewProfile={previewProfile} />
    </Providers>
  );
}
