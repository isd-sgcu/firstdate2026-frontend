import { toCanvas } from "@bwip-js/browser";
import { Providers } from "@components/shared/Providers";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export function QrCodePanel() {
  return (
    <Providers>
      <QrCodePanelInner />
    </Providers>
  );
}

function QrCodePanelInner() {
  const query = useQuery({
    queryKey: ["qrcode"],
    queryFn: () => "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  });

  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvas.current || !query.data) {
      return;
    }

    console.log(query.data);

    toCanvas(canvas.current, {
      text: query.data,
      bcid: "qrcode",
      scale: 4,
    });
  }, [query.data]);

  return (
    <section className="p-8 flex flex-col">
      <div className="aspect-square p-4">
        <canvas className="size-full" ref={canvas} />
      </div>
      <span className="font-bold text-center text-xl">6767676767</span>
    </section>
  );
}
