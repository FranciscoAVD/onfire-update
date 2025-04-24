import { Private } from "@/database/types";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { format, getDay, parseISO } from "date-fns";
import { weekPrivateTimeSlots } from "@/features/classes/lib/constants";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
export function PrivatesTable({ privates }: { privates: Private[] }) {
  return (
    <Card className="py-0">
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Rhythm</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {privates.length > 0 &&
              privates.map((p) => {
                const date = parseISO(p.date);
                return (
                  <TableRow key={p.id}>
                    <TableCell>{format(date, "EEEE, MMMM d")}</TableCell>
                    <TableCell>
                      {weekPrivateTimeSlots.get(getDay(date))?.get(p.timeSlot)}
                    </TableCell>
                    <TableCell>{p.rhythm}</TableCell>
                    <TableCell>
                      {p.staffName ? p.staffName : "Undecided"}
                    </TableCell>
                    <TableCell>
                      <Button variant="destructive" size="icon">
                        <Trash2 aria-hidden />
                        <span className="sr-only">Unschedule private</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            {privates.length === 0 && (
              <TableRow>
                <TableCell>No privates scheduled.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
