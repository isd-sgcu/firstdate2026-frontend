import type { HTMLAttributes } from "react";

import { cn } from "@lib/utils";

/**
 * The landing "ticket" card frame (Figma vector for the Landing screen), with the
 * children rendered inside the cream safe area.
 *
 * The 432x646 aspect ratio is a *minimum*: taller content stretches the card
 * (and the SVG) instead of overflowing, and the fr rows keep the safe area
 * proportional to the stretched height, so content never paints over the frame.
 */

type Props = HTMLAttributes<HTMLDivElement>;

export function LandingCardFrame({ className, children, ...props }: Props) {
  return (
    <div
      data-slot="landing-card-frame"
      className={cn(
        "relative grid w-full grid-cols-[minmax(0,1fr)] grid-rows-[9.7fr_75.3fr_15fr]",
        className,
      )}
      style={{ containerType: "inline-size" }}
      {...props}
    >
      <div
        className="col-start-1 row-span-full row-start-1 w-full"
        style={{ aspectRatio: "432 / 646" }}
        aria-hidden="true"
      ></div>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 432 646"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g filter="url(#landing_card_shadow)">
          <rect
            x="30.8984"
            y="25.9004"
            width="370"
            height="583.472"
            rx="20"
            fill="var(--color-primary)"
          ></rect>
          <path
            d="M351.929 42.7695C352.647 60.636 367.357 74.9004 385.399 74.9004C385.524 74.9004 385.648 74.8959 385.772 74.8945V557.904C385.648 557.903 385.524 557.9 385.399 557.9C366.898 557.9 351.899 572.899 351.899 591.4C351.899 591.769 351.907 592.137 351.919 592.503H79.8984C79.8985 592.469 79.8994 592.435 79.8994 592.4C79.8994 574.122 65.2598 559.264 47.0664 558.908V74.8906C64.8032 74.544 79.1595 60.4151 79.8691 42.7695H351.929Z"
            fill="var(--color-background)"
          ></path>
          <mask id="landing_card_frame_mask" fill="white">
            <path d="M339.626 53.875C340.842 70.5229 354.222 83.79 370.918 84.8311V547.906C370.744 547.904 370.571 547.9 370.396 547.9C351.896 547.9 336.898 562.897 336.896 581.397H89.7119C89.7104 564.173 76.7089 549.987 59.9844 548.112V85.7852C76.7049 84.4153 89.946 70.7685 90.6777 53.875H339.626Z"></path>
          </mask>
          <path
            d="M339.626 53.875C340.842 70.5229 354.222 83.79 370.918 84.8311V547.906C370.744 547.904 370.571 547.9 370.396 547.9C351.896 547.9 336.898 562.897 336.896 581.397H89.7119C89.7104 564.173 76.7089 549.987 59.9844 548.112V85.7852C76.7049 84.4153 89.946 70.7685 90.6777 53.875H339.626Z"
            fill="var(--color-background)"
          ></path>
          <path
            d="M339.626 53.875L340.623 53.8022L340.556 52.875H339.626V53.875ZM370.918 84.8311H371.918V83.8915L370.98 83.833L370.918 84.8311ZM370.918 547.906L370.903 548.906L371.918 548.922V547.906H370.918ZM336.896 581.397V582.397H337.896L337.896 581.398L336.896 581.397ZM89.7119 581.397L88.7119 581.398L88.712 582.397H89.7119V581.397ZM59.9844 548.112H58.9844V549.007L59.873 549.106L59.9844 548.112ZM59.9844 85.7852L59.9027 84.7885L58.9844 84.8637V85.7852H59.9844ZM90.6777 53.875V52.875H89.7201L89.6787 53.8317L90.6777 53.875ZM339.626 53.875L338.629 53.9478C339.881 71.0942 353.66 84.7569 370.856 85.8291L370.918 84.8311L370.98 83.833C354.784 82.8231 341.803 69.9517 340.623 53.8022L339.626 53.875ZM370.918 84.8311H369.918V547.906H370.918H371.918V84.8311H370.918ZM370.918 547.906L370.933 546.906C370.764 546.904 370.58 546.9 370.396 546.9V547.9V548.9C370.561 548.9 370.724 548.903 370.903 548.906L370.918 547.906ZM370.396 547.9V546.9C351.344 546.9 335.898 562.345 335.896 581.397L336.896 581.397L337.896 581.398C337.898 563.45 352.448 548.9 370.396 548.9V547.9ZM336.896 581.397V580.397H89.7119V581.397V582.397H336.896V581.397ZM89.7119 581.397L90.7119 581.397C90.7104 563.658 77.3205 549.049 60.0958 547.119L59.9844 548.112L59.873 549.106C76.0973 550.924 88.7105 564.688 88.7119 581.398L89.7119 581.397ZM59.9844 548.112H60.9844V85.7852H59.9844H58.9844V548.112H59.9844ZM59.9844 85.7852L60.066 86.7818C77.287 85.3709 90.9231 71.3173 91.6768 53.9183L90.6777 53.875L89.6787 53.8317C88.9688 70.2197 76.1228 83.4596 59.9027 84.7885L59.9844 85.7852ZM90.6777 53.875V54.875H339.626V53.875V52.875H90.6777V53.875Z"
            fill="#AA1D40"
            mask="url(#landing_card_frame_mask)"
          ></path>
          <path
            d="M376.373 47.3754L378.398 41.9004L380.423 47.3754L385.898 49.4004L380.423 51.4254L378.398 56.9004L376.373 51.4254L370.898 49.4004L376.373 47.3754Z"
            fill="var(--color-background)"
          ></path>
          <path
            d="M50.3734 48.3754L52.3984 42.9004L54.4234 48.3754L59.8984 50.4004L54.4234 52.4254L52.3984 57.9004L50.3734 52.4254L44.8984 50.4004L50.3734 48.3754Z"
            fill="var(--color-background)"
          ></path>
          <path
            d="M52.3734 580.375L54.3984 574.9L56.4234 580.375L61.8984 582.4L56.4234 584.425L54.3984 589.9L52.3734 584.425L46.8984 582.4L52.3734 580.375Z"
            fill="var(--color-background)"
          ></path>
          <path
            d="M376.373 580.375L378.398 574.9L380.423 580.375L385.898 582.4L380.423 584.425L378.398 589.9L376.373 584.425L370.898 582.4L376.373 580.375Z"
            fill="var(--color-background)"
          ></path>
        </g>
        <defs>
          <filter
            id="landing_card_shadow"
            x="-0.00156212"
            y="0.000391006"
            width="431.8"
            height="645.273"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            ></feColorMatrix>
            <feOffset dy="5"></feOffset>
            <feGaussianBlur stdDeviation="15.45"></feGaussianBlur>
            <feComposite in2="hardAlpha" operator="out"></feComposite>
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0"
            ></feColorMatrix>
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            ></feBlend>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            ></feBlend>
          </filter>
        </defs>
      </svg>

      <div className="relative z-10 col-start-1 row-start-2 px-[17%]">
        {children}
      </div>
    </div>
  );
}
