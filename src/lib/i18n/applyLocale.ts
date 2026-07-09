import en from "./dict/en.json";

const dict: Record<string, unknown> = en;

function resolve(key: string): string | undefined {
  const value = key
    .split(".")
    .reduce<unknown>(
      (acc, part) =>
        acc && typeof acc === "object" ? (acc as never)[part] : undefined,
      dict,
    );
  return typeof value === "string" ? value : undefined;
}

if (localStorage.getItem("locale") === "en") {
  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    const value = resolve(el.dataset.i18n ?? "");
    if (value) el.textContent = value;
  });
}
