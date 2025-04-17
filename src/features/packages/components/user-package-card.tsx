import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { PackagePurchased } from "@/database/types";
import { format, parseISO } from "date-fns";

export function UserPackageCard({ p }: { p: PackagePurchased }) {
  const pDate = format(parseISO(p.purchaseDate), "MMMM d, yyyy");
  const eDate = format(parseISO(p.expirationDate), "MMMM d, yyyy");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Paquete activo</CardTitle>
        <CardDescription>
          Es importante recordar que toda clase debe agendarse en o antes de la
          fecha de expiracion.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <span>Classes left</span>
          <span className="text-right">{p.privatesLeft}</span>
          <span>Purchase date</span>
          <span className="text-right">{pDate}</span>
          <span>Expiration date</span>
          <span className="text-right">{eDate}</span>
        </div>
      </CardContent>
    </Card>
  );
}
