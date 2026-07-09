import { buttonVariants } from "@components/ui/button";
import { appConfig } from "@lib/env";
import { getImageUrl } from "@lib/function";
import { cn } from "@lib/utils";

const rpkmImageUrl = getImageUrl("rpkm_logo.png");

const RedirectPanel = () => {
  return (
    <>
      <h1 className="w-full text-3xl font-bold text-primary text-center whitespace-pre-wrap leading-relaxed">
        {"งาน First Date จบแล้ว!\nแล้วเจอกันที่"}
      </h1>

      <div className="w-full flex flex-col items-center gap-8">
        <img
          src={rpkmImageUrl}
          alt="RPKM Logo"
          className="w-[80%] max-w-62.5"
        />
        {/* TODO: i18n + redirect path in appConfig */}
        <a
          href={appConfig.redirectTo}
          className={cn(
            buttonVariants({ variant: "extraRed", size: "lg" }),
            "w-fit px-6 py-4",
          )}
        >
          เข้าสู่เว็บไซต์
        </a>
      </div>

      {/* TODO: i18n  */}
      <p className="pt-6 text-xl text-center text-primary">
        วันที่ 31 กรกฎาคม ถึง 2 สิงหาคม
      </p>
    </>
  );
};

export default RedirectPanel;
