import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { toCanvas } from "@bwip-js/browser";
import { PanelFrame } from "@components/shared/PanelFrame";
import { Button } from "@components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "@components/ui/dialog";
import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

export interface QrCodeProps {
  contents: string;
  renderScale?: number;
}

export function QrCode({
  contents,
  renderScale,
  ...props
}: QrCodeProps & ComponentPropsWithoutRef<"canvas">) {
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvas.current) {
      return;
    }

    toCanvas(canvas.current, {
      text: contents,
      bcid: "qrcode",
      scale: renderScale ?? 4,
    });
  }, [contents, renderScale]);

  return <canvas ref={canvas} {...props} />;
}

interface QrCodeDialogProps {
  contents: string;
  renderTrigger?: DialogPrimitive.Trigger.Props["render"];
}

// children is what will be display under DialogTrigger
export function QrCodeDialog({ renderTrigger, contents }: QrCodeDialogProps) {
  return (
    <Dialog>
      <DialogTrigger render={renderTrigger} />
      <DialogOverlay forceRender className="fixed w-screen h-screen" />
      <DialogContent showCloseButton={false} className="bg-transparent ring-0">
        {/* TODO: fix pointer event around shape corner (inside bounding rect but not in the "shape") */}
        <PanelFrame>
          <section className="flex flex-col items-center gap-4 px-10">
            <div className="px-3 mt-4">
              <QrCode
                contents={contents}
                renderScale={6}
                className="size-full"
              />
            </div>
            <span className="font-bold text-center text-xl">6767676767</span>
            <DialogClose
              render={
                <Button size="lg" variant="red" className="w-full">
                  ปิด
                </Button>
              }
            />
          </section>
        </PanelFrame>
      </DialogContent>
    </Dialog>
  );
}
