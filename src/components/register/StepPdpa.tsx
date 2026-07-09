import { useEffect, useRef, useState } from "react";

import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { DoubleArrowDownIcon, DoubleArrowUpIcon } from "./icons";
import {
  PDPA_CONSENT_LABEL,
  PDPA_DEFINITIONS,
  PDPA_DEFINITIONS_HEADING,
  PDPA_INTRO,
  PDPA_SUBTITLE,
  PDPA_TITLE,
} from "@lib/pdpa";

export function StepPdpa({ onConsent }: { onConsent: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atBottom, setAtBottom] = useState(false);
  const [hasReadToEnd, setHasReadToEnd] = useState(false);
  const [consented, setConsented] = useState(false);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const reachedEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 8;
    setAtBottom(reachedEnd);
    if (reachedEnd) setHasReadToEnd(true);
  };

  // If the policy doesn't overflow, there's nothing to scroll — unlock immediately.
  useEffect(() => {
    const el = scrollRef.current;
    if (el && el.scrollHeight <= el.clientHeight + 8) {
      setAtBottom(true);
      setHasReadToEnd(true);
    }
  }, []);

  const jump = () =>
    scrollRef.current?.scrollTo({
      top: atBottom ? 0 : scrollRef.current.scrollHeight,
      behavior: "smooth",
    });

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="mt-6 shrink-0 px-6 text-center">
        {/* TODO: i18n */}
        <h1 className="text-3xl leading-tight font-bold text-primary">
          {PDPA_TITLE.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-1 text-base text-foreground">{PDPA_SUBTITLE}</p>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="no-scrollbar mt-4 min-h-0 flex-1 space-y-3 overflow-y-auto px-6 text-base text-foreground"
      >
        {/* TODO: i18n */}
        {PDPA_INTRO.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}

        <ol className="ml-5 list-decimal space-y-3">
          <li>
            {PDPA_DEFINITIONS_HEADING}
            <ul className="mt-3 list-disc space-y-3 pl-4">
              {PDPA_DEFINITIONS.map((d) => (
                <li key={d.term}>
                  <span className="font-bold">{d.term}</span> {d.definition}
                </li>
              ))}
            </ul>
          </li>
        </ol>
      </div>

      <div className="shrink-0 px-6 pt-3 pb-10">
        <button
          type="button"
          onClick={jump}
          className="mx-auto mb-3 flex items-center gap-1.5 text-sm font-bold text-fd-red"
        >
          {atBottom ? (
            <DoubleArrowUpIcon className="size-5" />
          ) : (
            <DoubleArrowDownIcon className="size-5" />
          )}
          {/* TODO: i18n */}
          {atBottom ? "เลื่อนขึ้นบนสุด" : "เลื่อนลงล่างสุด"}
        </button>

        <label className="mb-3 flex cursor-pointer items-start gap-2 text-sm text-foreground select-none">
          <Checkbox
            checked={consented}
            disabled={!hasReadToEnd}
            onCheckedChange={(checked) => setConsented(checked === true)}
            className="mt-0.5"
          />
          {/* TODO: i18n */}
          {PDPA_CONSENT_LABEL}
        </label>

        <Button
          type="button"
          size="lg"
          disabled={!consented}
          onClick={onConsent}
          className="h-14 w-full rounded-full text-lg font-normal disabled:bg-[#A1A1A1] disabled:text-primary-foreground disabled:opacity-100"
        >
          {/* TODO: i18n */}
          รับทราบและยินยอม
        </Button>
      </div>
    </div>
  );
}
