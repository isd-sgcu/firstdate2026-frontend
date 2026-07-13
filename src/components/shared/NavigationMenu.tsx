import { useStore } from "@nanostores/react";

import { Button } from "@components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@components/ui/drawer";
import { $locale, setLocale } from "@lib/i18n/locale";
import { useT } from "@lib/i18n/useT";
import { Menu } from "lucide-react";
import firstdateLogo from "@assets/images/logo_horizontal.png";
import homeIcon from "@assets/icons/material-symbols_home-rounded.svg";
import scanIcon from "@assets/icons/qr_scanner_icon.svg";
import qrCodeIcon from "@assets/icons/material-symbols_qr-code-rounded.svg";
import editIcon from "@assets/icons/material-symbols_edit-rounded.svg";
import mapIcon from "@assets/icons/material-symbols_map.svg";
import calendarIcon from "@assets/icons/material-symbols_calendar-month-rounded.svg";
import emergencyIcon from "@assets/icons/material-symbols_call-quality-rounded.svg";
import { QrCodeDialog } from "./QrCode";

// not shadcn sidebar. actually a drawer
export function NavigationMenu() {
  const isStaff = false;
  const locale = useStore($locale);
  const t = useT();

  return (
    <Drawer swipeDirection="up">
      <DrawerTrigger
        render={
          <Button className="cursor-pointer active:bg-black/10 rounded-md">
            <Menu className="size-6.5 text-muted" />
          </Button>
        }
      />

      <DrawerContent className="select-none">
        <div className="xs:w-md xs:mx-auto ">
          <DrawerHeader className="flex flex-row items-start justify-between pt-8 px-8">
            <img
              src={firstdateLogo.src}
              alt="firstdate logo"
              className="size-20"
            />
            <div className="flex items-center gap-0.5">
              <Button
                type="button"
                variant="ghost"
                className="text-lg active:bg-accent p-2 size-10.5 rounded"
                onClick={() => setLocale(locale === "th" ? "en" : "th")}
              >
                {locale === "th" ? "TH" : "EN"}
              </Button>

              <DrawerClose className="p-2 rounded active:bg-accent">
                <Menu className="size-6.5 text-primary" />
              </DrawerClose>
            </div>
          </DrawerHeader>
          <section className="mt-6 text-base font-bold px-4">
            <DrawerClose
              render={
                <a
                  href="/"
                  className="flex w-full items-center py-3.5 rounded px-4 gap-2 active:bg-accent"
                >
                  <img src={homeIcon.src} alt="" className="size-6" />
                  <span className="pt-1">{t("nav.home")}</span>
                </a>
              }
            />

            {/* TODO: link? */}
            {isStaff ? (
              <DrawerClose
                render={
                  <a
                    href="/staff/register"
                    className="flex w-full items-center py-3.5 rounded px-4 gap-2 active:bg-accent"
                  >
                    <img src={scanIcon.src} alt="" className="size-6" />
                    <span className="pt-1">{t("nav.scanRegister")}</span>
                  </a>
                }
              />
            ) : (
              <>
                <QrCodeDialog
                  contents="6767676767"
                  renderTrigger={
                    <DrawerClose
                      render={
                        <a className="flex w-full items-center py-3.5 rounded px-4 gap-2 active:bg-accent">
                          <img src={qrCodeIcon.src} alt="" className="size-6" />
                          <span className="pt-1">{t("nav.qrCode")}</span>
                        </a>
                      }
                    />
                  }
                />

                <DrawerClose
                  render={
                    <a
                      href="/"
                      className="flex w-full items-center py-3.5 rounded px-4 gap-2 active:bg-accent"
                    >
                      <img src={editIcon.src} alt="" className="size-6" />
                      <span className="pt-1">{t("nav.editInfo")}</span>
                    </a>
                  }
                />
              </>
            )}

            <DrawerClose
              render={
                <a
                  href="/map"
                  className="flex w-full items-center py-3.5 rounded px-4 gap-2 active:bg-accent"
                >
                  <img src={mapIcon.src} alt="" className="size-6" />
                  <span className="pt-1">{t("map.title")}</span>
                </a>
              }
            />

            <DrawerClose
              render={
                <a
                  href="/#fd-calendar"
                  className="flex w-full items-center py-3.5 rounded px-4 gap-2 active:bg-accent"
                >
                  <img src={calendarIcon.src} alt="" className="size-6" />
                  <span className="pt-1">{t("nav.calendar")}</span>
                </a>
              }
            />

            <DrawerClose
              render={
                <a
                  href="/emergency"
                  className="flex w-full items-center py-3.5 rounded px-4 gap-2 active:bg-accent"
                >
                  <img src={emergencyIcon.src} alt="" className="size-6" />
                  <span className="pt-1">{t("emergency.title")}</span>
                </a>
              }
            />
          </section>
          <div className="flex items-center justify-center w-full pt-6 pb-8">
            <Button size="lg" className="text-lg px-6 py-3">
              {t("nav.logout")}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
