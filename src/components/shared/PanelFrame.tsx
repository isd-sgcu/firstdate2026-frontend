import type { ComponentPropsWithoutRef } from "react";

import { ChevronLeft } from "lucide-react";

import { cn } from "@lib/utils";
import logo from "@assets/images/logo_horizontal.png";
import { NavigationMenu } from "@components/shared/NavigationMenu";

/**
 * The ticket/panel vector as a resizable "3-patch" (a vertical-only 9-patch).
 *
 * The source SVG (402x874) is sliced into three bands. The top and bottom caps
 * keep their artwork and scale with width; the middle band stretches to fill
 * the remaining height. The side edges are dead-straight between y=200 and
 * y=700, so the caps are cut there and the middle lines up with them.
 *
 * This renders only the shape — it fills its parent (`absolute inset-0`), so
 * wrap it in your own positioned container and layer content over it.
 *
 * A given shape is either filled OR stroked, never both:
 *   - `variant="fill"`   solid fill (default)
 *   - `variant="stroke"` outline only, constant-width via non-scaling-stroke
 */

// Cap outlines, open (ending on the cut edge). Fill mode closes them with "Z";
// stroke mode leaves them open so the horizontal cut seam isn't drawn.
const TOP_CAP =
  "M0 200L0.479984 115.679L15.0195 112.819C26.9924 107.794 36.4921 96.5802 42.2786 83.6628C46.8584 73.4507 41.372 64.9418 48.2984 65.0035L70.351 65.2039C72.5176 65.227 75.5442 65.5584 77.0908 63.7858L92.1969 46.429C141.569 -4.29264 215 -13.8188 274.291 19.6385C288.964 27.9161 301.95 38.2438 313.41 51.4772L323.149 61.8204C325.283 64.8956 328.349 65.4197 331.662 65.3503L356.008 64.8494C357.608 77.2812 361.595 89.0194 368.741 98.4531C374.448 105.983 381.374 110.276 389.654 113.043L402 117.174L402 200";

const BOTTOM_CAP =
  "M402 700L401.82 758.104C390.687 759.306 380.574 763.583 372.268 771.869C362.681 781.41 357.361 794.675 356.061 809.326L325.396 809.719C309.27 831.446 289.07 848.256 265.858 859.3C201.02 889.729 123.843 872.688 77.2174 810.313L45.6651 809.457C43.4586 783.422 27.4524 760.362 4.41319 759.452C2.62658 759.375 0 757.749 0 755.275L0 700";

const WIDTH = 402;
const TOP_CAP_HEIGHT = 200;
const BOTTOM_CAP_HEIGHT = 174; // 874 - 700

export interface PanelFrameShapeProps extends ComponentPropsWithoutRef<"div"> {
  /** Fill (solid) or stroke (outline only). */
  variant?: "fill" | "stroke";
  /** Colour of the fill or the stroke. Defaults to the FD/White background token. */
  color?: string;
  /** Stroke width in px (screen units, constant under stretch). Only used when `variant="stroke"`. */
  strokeWidth?: number;
}

export function PanelFrameShape({
  variant = "fill",
  color = "var(--color-background)",
  strokeWidth = 2,
  className,
  ...props
}: PanelFrameShapeProps) {
  const isStroke = variant === "stroke";

  const pathProps = isStroke
    ? {
        fill: "none",
        stroke: color,
        strokeWidth,
        strokeLinejoin: "round" as const,
        vectorEffect: "non-scaling-stroke" as const,
      }
    : { fill: color };

  const svgClass = cn("block w-full shrink-0", isStroke && "overflow-visible");

  return (
    <div
      aria-hidden
      data-slot="panel-frame-shape"
      className={cn(
        "pointer-events-none absolute inset-0 flex flex-col",
        className,
      )}
      {...props}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${TOP_CAP_HEIGHT}`}
        className={cn(svgClass, "h-auto")}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={isStroke ? TOP_CAP : `${TOP_CAP}Z`} {...pathProps} />
      </svg>

      {isStroke ? (
        <svg
          viewBox={`0 0 ${WIDTH} 100`}
          preserveAspectRatio="none"
          className={cn(svgClass, "min-h-0 flex-1")}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Straight side walls; vertical so stretching doesn't distort them. */}
          <path d={`M0 0V100M${WIDTH} 0V100`} {...pathProps} />
        </svg>
      ) : (
        <div className="-my-px min-h-0 flex-1" style={{ background: color }} />
      )}

      <svg
        viewBox={`0 700 ${WIDTH} ${BOTTOM_CAP_HEIGHT}`}
        className={cn(svgClass, "h-auto")}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={isStroke ? BOTTOM_CAP : `${BOTTOM_CAP}Z`} {...pathProps} />
      </svg>
    </div>
  );
}

export interface PanelFrameProps extends ComponentPropsWithoutRef<"div"> {
  navigateBack?: string;
  showMenu?: boolean;
}

export function PanelFrame({
  navigateBack = "",
  showMenu = true,
  className,
  children,
  ...rest
}: PanelFrameProps) {
  return (
    <div
      className={cn("relative min-h-160 w-full", className)}
      style={{ containerType: "inline-size" }}
      {...rest}
    >
      <div className="absolute inset-0 z-[-2]">
        <PanelFrameShape />
      </div>
      <div className="absolute inset-x-5 inset-y-6 z-[-1]">
        <PanelFrameShape
          variant="stroke"
          strokeWidth={1}
          color="var(--color-primary)"
        />
      </div>

      <div className="absolute top-[7.5cqw] right-0 left-0 grid place-items-center">
        <img src={logo.src} alt="firstdate logo" className="h-[28cqw] w-fit" />
      </div>

      {navigateBack && (
        <div className="absolute top-[4.5cqw] left-4 flex h-12 items-center">
          <a href={navigateBack}>
            <ChevronLeft className="size-6.5 text-muted" />
          </a>
        </div>
      )}

      {showMenu && (
        <div className="absolute top-[4.5cqw] right-4 flex h-12 items-center">
          <NavigationMenu />
        </div>
      )}

      {/* really depends on width */}
      <div className="px-[1.25em] py-[31.35cqw]">{children}</div>
    </div>
  );
}
