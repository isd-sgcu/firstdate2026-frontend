import { cn } from "@lib/utils";

type RegisterStepperProps = {
  current: number;
  total: number;
};

export function RegisterStepper({ current, total }: RegisterStepperProps) {
  const steps = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <ol className="mx-auto flex w-fit items-center">
      {steps.map((step, index) => {
        const isReached = step <= current;

        return (
          <li key={step} className="flex items-center">
            <span
              className={cn(
                "flex shrink-0 w-7 h-7 items-center justify-center rounded-full text-sm leading-none font-bold transition-colors",
                isReached
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-primary",
              )}
              aria-current={step === current ? "step" : undefined}
            >
              {step}
            </span>
            {index < total - 1 && (
              <span
                aria-hidden
                className={cn(
                  "h-0.5 w-6 shrink-0 transition-colors",
                  // this connector is "passed" once we're on a later step
                  step < current ? "bg-primary" : "bg-muted",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
