import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";

import { cn } from "@lib/utils";
import { useId } from "react";
import { Field, FieldContent, FieldLabel } from "./field";

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  );
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "group/radio-group-item peer relative flex aspect-square size-5 shrink-0 rounded-full outline-none bg-tertrary after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-5 items-center justify-center"
      >
        <span className="absolute top-1/2 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}

function RadioGroupChoiceCard({
  children,
  className,
  showIndicator = false,
  ...props
}: RadioPrimitive.Root.Props & { showIndicator?: boolean }) {
  const id = useId();
  return (
    <FieldLabel
      data-slot="field-label"
      htmlFor={id}
      className={cn(
        "border-[2.5px]! border-border/0 bg-tertrary rounded-md! has-data-checked:border-primary-alt has-data-checked:bg-secondary",
        className,
      )}
    >
      <Field orientation="horizontal">
        <FieldContent>{children}</FieldContent>

        {showIndicator ? (
          <RadioPrimitive.Root
            data-slot="radio-group-item"
            className={cn(
              "group/radio-group-item peer relative flex aspect-square size-5 shrink-0 rounded-full border border-input bg-white outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-tertrary data-checked:bg-tertrary data-checked:text-primary-foreground dark:data-checked:bg-primary",
            )}
            id={id}
            {...props}
          >
            <RadioPrimitive.Indicator
              data-slot="radio-group-indicator"
              className="flex size-5 items-center justify-center"
            >
              <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground group-data-checked/radio-group-item:bg-secondary" />
            </RadioPrimitive.Indicator>
          </RadioPrimitive.Root>
        ) : (
          <RadioPrimitive.Root id={id} {...props}>
            <RadioPrimitive.Indicator></RadioPrimitive.Indicator>
          </RadioPrimitive.Root>
        )}
      </Field>
    </FieldLabel>
  );
}

export { RadioGroup, RadioGroupChoiceCard, RadioGroupItem };
