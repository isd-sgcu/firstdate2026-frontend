import { Button } from "@components/ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Field } from "./ui/field";
import { Checkbox } from "./ui/checkbox";
import { Switch } from "./ui/switch";

export function ComponentDemo() {
  return (
    <section className="grid gap-6 rounded-lg bg-background p-6 border w-full">
      <h2 className="text-xl font-bold font-mono"> Components </h2>
      <Button type="button" size="rpkm">
        sjdfhiugy
      </Button>

      <Button type="button" variant="secondary" size="rpkm">
        jhukj,
      </Button>

      <Field>
        <Label> ประเทศ </Label>
        <Input variant="outlined" placeholder="แคนาดา" />
      </Field>

      <Field>
        <Label> ema </Label>
        <Input placeholder="正しくない" />
      </Field>

      <Field>
        <div className="flex gap-2">
          <Checkbox />
          <Label>idk</Label>
        </div>
      </Field>

      <Field>
        <div className="flex gap-2">
          <Switch />
          <Label>idk</Label>
        </div>
      </Field>
    </section>
  );
}
