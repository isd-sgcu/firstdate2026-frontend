import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "h-10 w-full min-w-0 px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:text-sm file:font-medium file:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed  disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 text-sm  dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default:
          "rounded-md bg-tertrary focus-visible:ring-secondary/50 placeholder:text-amber-900/40",
        outlined:
          "rounded-md border border-black bg-transparent file:bg-transparent disabled:bg-input/50 dark:bg-input/30 dark:disabled:bg-input/80 placeholder:text-muted-foreground",
        shadcn:
          "rounded-lg border border-input bg-transparent file:bg-transparent disabled:bg-input/50 dark:bg-input/30 dark:disabled:bg-input/80 placeholder:text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Input({
  className,
  variant = "default",
  type,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Input };
