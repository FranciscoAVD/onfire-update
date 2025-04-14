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
import {
  DISABLED_DAYS,
  otherStyles,
  rhythms,
  salsaStyles,
  weekGroupTimeSlots,
} from "@/features/classes/lib/constants";
import { MINIMUM_GROUP_COST } from "@/features/classes/groups/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { addGroupAction } from "@/features/classes/groups/actions/add-group-action";

const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export function AddGroupForm({ className }: { className?: string }) {
  const [rhythm, setRhythm] = useState<string>("Salsa");
  const [styles, setStyles] = useState<string[]>(salsaStyles);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [state, formAction, isLoading] = useActionState(addGroupAction, {
    success: false,
  });
  useEffect(() => {
    switch (rhythm) {
      case "Salsa": {
        setStyles(salsaStyles);
        break;
      }
      default: {
        setStyles(otherStyles);
        break;
      }
    }
  }, [rhythm]);
  useEffect(() => {
    if (state.success) {
      toast("Package successully created!", {
        description: "Visit package page to see the newly added package.",
      });
    }
  }, [state]);
  return (
    <form
      action={formAction}
      className={cn(`grid grid-cols-2 gap-4 ${className}`)}
    >
      <div className="col-span-full flex flex-col gap-1">
        <Label htmlFor="form-groups-add--name">Group name</Label>
        <Input id="form-groups-add--name" name="name" min={1} required />
      </div>
      <div className="col-span-full flex flex-col gap-1">
        <Label>Type</Label>
        <Select name="type" defaultValue="group" required>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="group">Group</SelectItem>
            <SelectItem value="workshop">Workshop</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-full flex flex-col gap-1">
        <Label htmlFor="form-groups-add--cost">
          Cost <DollarSign className="size-4" aria-hidden />
        </Label>
        <Input
          id="form-groups-add--cost"
          name="cost"
          type="number"
          min={MINIMUM_GROUP_COST}
          required
        />
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
            {rhythms.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
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
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-full flex flex-col gap-4">
        <Label asChild>
          <p>Days available</p>
        </Label>
        <div role="grid" className="flex items-center flex-wrap gap-4">
          {days.map((d, dayIdx) => {
            if (DISABLED_DAYS.includes(dayIdx)) return null;
            return (
              <div key={d} className="flex items-center gap-2">
                <Checkbox
                  id={`form-groups-add--${d}`}
                  name="days"
                  value={dayIdx}
                  checked={selectedDays.includes(dayIdx)}
                  onCheckedChange={(v) => {
                    setSelectedDays((prev) => {
                      if (v) {
                        return [...prev, dayIdx];
                      } else {
                        const valueIdx = prev.indexOf(dayIdx);
                        return [
                          ...prev.slice(0, valueIdx),
                          ...prev.slice(valueIdx + 1),
                        ];
                      }
                    });
                  }}
                />
                <Label htmlFor={`form-groups-add--${d}`} className="capitalize">
                  {d}
                </Label>
              </div>
            );
          })}
        </div>
      </div>
      {selectedDays.length > 0 && (
        <div className="col-span-full space-y-4">
          {selectedDays.map((d) => (
            <DayTime d={d} key={d} />
          ))}
        </div>
      )}
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
      <Button type="submit" className="col-span-full">
        Add group
      </Button>
    </form>
  );
}

function DayTime({ d }: { d: number }) {
  const times = weekGroupTimeSlots.get(d);
  if (!times) return null;
  return (
    <Card>
      <CardContent className="grid grid-cols-3 items-center gap-4">
        <p className="font-semibold capitalize">{days[d]}</p>
        <div className="flex flex-col gap-1">
          <Label>Start time</Label>
          <Select name={`start_${d}`} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a start time" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(times.entries()).map(([key, value]) => (
                <SelectItem key={key} value={`${key}`}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <Label>End time</Label>
          <Select name={`end_${d}`} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an end time" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(times.entries()).map(([key, value]) => (
                <SelectItem key={key} value={`${key}`}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
