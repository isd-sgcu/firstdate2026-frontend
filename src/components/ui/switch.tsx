import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@lib/utils";

const switchVariants = cva(
  "peer relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-disabled:cursor-not-allowed data-disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "data-checked:bg-primary data-unchecked:bg-muted-foreground dark:data-unchecked:bg-muted",
        secondary:
          "data-checked:bg-secondary data-unchecked:bg-tertrary dark:data-unchecked:bg-input/80",
      },
      size: {
        default: "h-[18.8px] w-[32px]",
        sm: "h-[14px] w-[24px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-background ring-0 transition-transform dark:data-checked:bg-secondary dark:data-unchecked:bg-foreground shadow",
  {
    variants: {
      size: {
        default:
          "size-4 data-checked:translate-x-[calc(100%-2px)] data-unchecked:translate-x-[0.4px]",
        sm: "size-3 data-checked:translate-x-[calc(100%-2px)] data-unchecked:translate-x-0",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

function Switch({
  className,
  size = "default",
  variant = "default",
  ...props
}: SwitchPrimitive.Root.Props & VariantProps<typeof switchVariants>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(switchVariants({ variant, size, className }))}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={switchThumbVariants({ size })}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch, switchVariants };
