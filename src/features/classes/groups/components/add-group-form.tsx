"use client";

import { cn } from "@/lib/utils";
import { useActionState, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { DollarSign } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const days = [
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
  { label: "Sunday", value: 0 },
];

export function AddGroupForm({ className }: { className?: string }) {
  const [rhythm, setRhythm] = useState<string>("Salsa");
  const [styles, setStyles] = useState<string[]>(["On 1", "On 2", "On 1/On 2"]);
  useEffect(() => {
    switch (rhythm) {
      case "Salsa": {
        setStyles(["On 1", "On 2", "On 1/On 2"]);
        break;
      }
      case "Bachata": {
        setStyles(["tradicional"]);
        break;
      }
      case "Cha-Cha-Cha": {
        setStyles(["tradicional"]);
        break;
      }
    }
  }, [rhythm]);
  // useEffect(() => {
  //   if (state.success) {
  //     toast("Package successully created!", {
  //       description: "Visit package page to see the newly added package.",
  //     });
  //   }
  // }, [state]);
  return (
    <form className={cn(`grid grid-cols-2 gap-4 ${className}`)}>
      <div className="col-span-full flex flex-col gap-1">
        <Label htmlFor="form-groups-add--name">Group name</Label>
        <Input id="form-groups-add--name" name="name" />
      </div>
      <div className="col-span-full flex flex-col gap-1">
        <Label htmlFor="form-groups-add--cost">
          Cost <DollarSign className="size-4" aria-hidden />
        </Label>
        <Input id="form-groups-add--cost" name="cost" required />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Rhythm</Label>
        <Select
          name="rhythm"
          value={rhythm}
          onValueChange={(v) => setRhythm(v)}
          required
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Salsa">Salsa</SelectItem>
            <SelectItem value="Bachata">Bachata</SelectItem>
            <SelectItem value="Cha-Cha-Cha">Cha-Cha-Cha</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <Label>Style</Label>
        <Select name="style" defaultValue={styles[0]} required>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {styles.map((s) => (
              <SelectItem className="capitalize" key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <Label>Time</Label>
        <Select name="time" required>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent></SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="form-groups-add--duration">Duration</Label>
        <Select name="duration" defaultValue="60" required>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="60">60 minutes</SelectItem>
            <SelectItem value="90">90 minutes</SelectItem>
            <SelectItem value="120">120 minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Label className="col-span-full" asChild>
          <p>Days available</p>
        </Label>
        {days.map((d) => (
          <div key={d.value} className="flex items-center gap-2">
            <Checkbox id={`form-groups-add--${d.label}`} name={d.label} />
            <Label htmlFor={`form-groups-add--${d.label}`}>{d.label}</Label>
          </div>
        ))}
      </div>
      <div className="col-span-full flex flex-col gap-1">
        <Label htmlFor="form-groups-add--description">Description</Label>
        <Textarea
          id="form-groups-add--description"
          name="description"
          minLength={20}
          maxLength={255}
          required
        />
      </div>
    </form>
  );
}
