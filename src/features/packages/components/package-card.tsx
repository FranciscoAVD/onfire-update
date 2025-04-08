import { Button } from "@/components/ui/button";
import { Package } from "@/database/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PackageCardPopover } from "@/features/packages/components/package-card-popover";

export default function PackageCard({
  p,
  isAdmin,
  isActive,
}: {
  p: Package;
  isAdmin: boolean;
  isActive: boolean;
}) {
  const dollarAmount = p.cost / 100; //cents -> dollar
  return (
    <Card className="relative text-center border-2 hover:border-primary rounded-xl transition-all">
      {isAdmin && <PackageCardPopover id={p.id} isActive={p.isActive} />}
      <CardHeader className="gap-0">
        <span className="w-fit mx-auto mb-2 text-sm font-semibold bg-orange-100 rounded-full px-3 py-1">
          {p.discount > 0 ? `${p.discount}% Discount` : "Base price"}
        </span>
        <CardTitle className="text-2xl capitalize font-bold">
          {p.packageName}
        </CardTitle>
        <CardDescription>
          {p.numberOfPrivates} {p.numberOfPrivates > 1 ? "Classes" : "Class"}
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <span className="text-5xl font-bold">${dollarAmount}</span>{" "}
        <p className="my-6 text-sm">{p.description}</p>
      </CardContent>
      <CardFooter className="block mt-auto">
        <form className="">
          <Button type="submit" className="w-full" disabled={!isActive}>
            {isActive ? "Bailemos" : "Disabled"}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
