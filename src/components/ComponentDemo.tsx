import { Button } from "@components/ui/button";
import { Checkbox } from "./ui/checkbox";
import { Field } from "./ui/field";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupChoiceCard } from "./ui/radio-group";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function ComponentDemo() {
  return (
    <section className="grid gap-4 rounded-lg bg-background p-6 border w-full">
      <h1 className="text-xl font-bold font-mono"> Components </h1>

      <h2 className="text-lg font-bold font-mono"> Button </h2>
      <Button type="button" size="rpkm">
        sjdfhiugy
      </Button>
      <Button type="button" variant="secondary" size="rpkm">
        jhukj,
      </Button>
      <hr />

      <h2 className="text-lg font-bold font-mono"> Input </h2>
      <Field>
        <Label> Default </Label>
        <Input placeholder="正しくない" />
      </Field>

      <Field>
        <Label> Outlined </Label>
        <Input variant="outline" placeholder="แคนาดา" />
      </Field>

      <hr />

      <Field>
        <div className="flex gap-2">
          <Checkbox />
          <Label>Checkbox</Label>
        </div>
      </Field>

      <Field>
        <div className="flex gap-2">
          <Switch />
          <Label>Switch</Label>
        </div>
      </Field>
      <hr />

      <div className="space-y-2">
        <h2 className="text-lg font-bold font-mono"> Radio Choice Card </h2>
        <p className="text-sm">
          pls see{" "}
          <a
            href="https://ui.shadcn.com/docs/components/radix/radio-group#choice-card"
            className="text-primary underline"
          >
            {" "}
            shadcn ui radio group{" "}
          </a>
        </p>
      </div>
      <RadioGroup defaultValue="plus" className="">
        <RadioGroupChoiceCard value="plus" className="w-12">
          No indicator
        </RadioGroupChoiceCard>

        <RadioGroupChoiceCard value="aljdfihiugs" showIndicator>
          With indicator
        </RadioGroupChoiceCard>
      </RadioGroup>
      <hr />

      <h2 className="text-lg font-bold font-mono"> Select </h2>

      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <hr />
    </section>
  );
}
