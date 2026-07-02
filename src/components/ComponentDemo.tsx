import { Button } from "@components/ui/button";
import { Checkbox } from "./ui/checkbox";
import { Field, FieldTitle, FieldDescription } from "./ui/field";
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
    <section className="grid gap-4 rounded-lg bg-background p-6 border w-full text-foreground">
      <h1 className="text-xl font-bold font-mono"> Components </h1>

      <h2 className="text-lg font-bold font-mono"> Button </h2>
      <Button type="button" size="rpkm">
        ตกลง
      </Button>
      <Button type="button" variant="secondary" size="rpkm">
        jhukj,
      </Button>
      <hr />

      <h2 className="text-lg font-bold font-mono"> Input </h2>
      <Field>
        <Label className="font-bold"> Default </Label>
        <Input placeholder="えま" />
      </Field>

      <Field>
        <Label className="font-bold"> Outlined </Label>
        <Input variant="outline" placeholder="แคนาดา" />
      </Field>

      <hr />

      <Label>
        <div className="flex gap-2 items-center">
          <Checkbox />
          Checkbox
        </div>
      </Label>

      <Label>
        <div className="flex gap-2 items-center">
          <Switch />
          Switch
        </div>
      </Label>

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
          ช้าง
        </RadioGroupChoiceCard>

        <RadioGroupChoiceCard value="aljdfihiugs">
          <FieldTitle>ม้า</FieldTitle>
          <FieldDescription>description</FieldDescription>
        </RadioGroupChoiceCard>

        <RadioGroupChoiceCard value="ok" showIndicator>
          showIndicator
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
