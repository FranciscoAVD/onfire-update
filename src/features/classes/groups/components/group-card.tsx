import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { days } from "@/features/classes/lib/constants";
import { weekGroupTimeSlots } from "@/features/classes/lib/constants";
import { Clock, Calendar } from "lucide-react";
import { ZGroup } from "@/features/classes/groups/lib/types";

export function GroupCard({ group }: { group: ZGroup }) {
  return (
    <Card className="pt-0 overflow-hidden">
      <div className="relative h-48 bg-gradient-to-r from-purple-500 to-indigo-600">
        <span className="absolute top-4 right-4 text-lg font-semibold bg-white text-primary hover:bg-white px-3 rounded-full">
          ${group.cost / 100}
        </span>
      </div>
      <CardHeader>
        <CardTitle className="text-2xl">{group.name}</CardTitle>
        {group.dayTime.map((d) => (
          <CardDescription
            key={d.day}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span className="capitalize">{`${days[d.day]}s`}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {weekGroupTimeSlots.get(d.day)?.get(d.startTime)} -{" "}
              {weekGroupTimeSlots.get(d.day)?.get(d.endTime)}
            </div>
          </CardDescription>
        ))}
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-justify">
          {group.description}
        </p>
      </CardContent>
    </Card>
  );
}
