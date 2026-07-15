import { cn } from "@lib/utils";

/**
 * The rounded edit-dialog card (357x807 source, top & bottom centre notches)
 * as a vertical 3-patch: top and bottom caps keep their notch artwork and
 * scale with width; the straight-sided middle band stretches to fill height.
 * Sides are dead-straight (x=0 / x=357) between y=48.8 and y=762, so the caps
 * are cut inside that range and the middle lines up with them.
 */

// Top cap: left side up, notched top edge, right side down to the cut (y=130).
const TOP =
  "M0 130V48.8174C1.37056 48.9376 2.75839 49 4.16016 49C30.1173 48.9997 51.1602 27.9572 51.1602 2C51.1602 1.32996 51.145 0.663217 51.1172 0H314.202C314.174 0.663217 314.16 1.32996 314.16 2C314.16 26.5556 332.991 46.7119 357 48.8174V130";

// Bottom cap: right side down, notched bottom edge, left side up to the cut (y=657).
const BOTTOM =
  "M357 657V762.001C331.827 762.132 311.337 782.053 310.293 807H47.207C46.1592 781.97 25.5373 762 0.25 762C0.166615 762 0.0832829 762.001 0 762.001V657";

const WIDTH = 357;
const TOP_H = 130;
const BOTTOM_TOP = 657;
const BOTTOM_H = 807 - BOTTOM_TOP; // 150

export function DialogFrameShape({
  variant = "fill",
  color = "var(--color-background)",
  strokeWidth = 2,
  className,
}: {
  variant?: "fill" | "stroke";
  color?: string;
  strokeWidth?: number;
  className?: string;
}) {
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
      className={cn(
        "pointer-events-none absolute inset-0 flex flex-col",
        className,
      )}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${TOP_H}`}
        className={cn(svgClass, "h-auto")}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={isStroke ? TOP : `${TOP}Z`} {...pathProps} />
      </svg>

      {isStroke ? (
        <svg
          viewBox={`0 0 ${WIDTH} 100`}
          preserveAspectRatio="none"
          className={cn(svgClass, "min-h-0 flex-1")}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={`M0 0V100M${WIDTH} 0V100`} {...pathProps} />
        </svg>
      ) : (
        <div className="-my-px min-h-0 flex-1" style={{ background: color }} />
      )}

      <svg
        viewBox={`0 ${BOTTOM_TOP} ${WIDTH} ${BOTTOM_H}`}
        className={cn(svgClass, "h-auto")}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={isStroke ? BOTTOM : `${BOTTOM}Z`} {...pathProps} />
      </svg>
    </div>
  );
}
