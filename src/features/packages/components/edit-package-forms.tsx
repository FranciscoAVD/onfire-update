"use client";
import { useState, useActionState, useEffect } from "react";
import { Package } from "@/database/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { H3 } from "@/components/ui/headers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check, DollarSign, Percent, SquarePen, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Textarea } from "@/components/ui/textarea";
import {
  updatePackageDescriptionAction,
  updatePackageNameAction,
  updatePackageNumbersAction,
} from "@/features/packages/actions/update-package-data-actions";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { MINIMUM_PRIVATE_COST } from "@/features/classes/lib/constants";

export function EditPackageForms({ p }: { p: Package }) {
  return (
    <section className="py-10">
      <Card className="py-0 overflow-hidden">
        <CardContent className="px-0">
          <EditPackageNameForm id={p.id} name={p.packageName} />
          <EditPackagePrivatesDiscountForm
            id={p.id}
            discount={p.discount}
            privates={p.numberOfPrivates}
            cost={p.cost}
            className="border-t"
          />
          <EditPackageDescriptionForm
            id={p.id}
            description={p.description}
            className="border-t"
          />
        </CardContent>
      </Card>
    </section>
  );
}

function EditPackageNameForm({
  id,
  name,
  className,
}: {
  id: Package["id"];
  name: Package["packageName"];
  className?: string;
}) {
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [state, formAction, isLoading] = useActionState(
    updatePackageNameAction,
    { success: false },
  );
  useEffect(() => {
    if (state.success) {
      toast("Package name updated.");
      setCanEdit(false);
    }
  }, [state]);
  return (
    <div className={cn(`p-4 ${className}`)}>
      {" "}
      <AnimatePresence>
        {canEdit ? (
          <motion.form
            initial={{
              opacity: 0,
              translateY: 5,
            }}
            animate={{
              opacity: 1,
              translateY: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              ease: "easeInOut",
            }}
            className="relative grow space-y-2"
            action={formAction}
          >
            <Label htmlFor="form-packages-edit--name">Edit Package name</Label>
            <Input
              id="form-packages-edit--name"
              name="name"
              defaultValue={name}
              required
            />
            <Input
              name="id"
              value={id}
              className="h-0 p-0 invisible"
              readOnly
              required
            />
            <div className="mt-4 flex gap-2">
              <Button type="submit">
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <Check aria-hidden /> Update
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setCanEdit(false)}
                disabled={isLoading}
              >
                <X aria-hidden /> Cancel
              </Button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex"
          >
            <div>
              <span className="text-sm text-neutral-500">Package name</span>
              <p className="">{name}</p>
            </div>
            <Button
              size="icon"
              variant={"outline"}
              className="ml-auto"
              onClick={() => setCanEdit(true)}
            >
              <SquarePen aria-hidden /> <span className="sr-only">Edit</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
function EditPackageDescriptionForm({
  id,
  description,
  className,
}: {
  id: Package["id"];
  description: Package["description"];
  className?: string;
}) {
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [state, formAction, isLoading] = useActionState(
    updatePackageDescriptionAction,
    { success: false },
  );

  useEffect(() => {
    if (state.success) {
      toast("Package description updated.");
      setCanEdit(false);
    }
  }, [state]);

  return (
    <div className={cn(`p-4 ${className}`)}>
      {" "}
      <AnimatePresence>
        {canEdit ? (
          <motion.form
            initial={{
              opacity: 0,
              translateY: 5,
            }}
            animate={{
              opacity: 1,
              translateY: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              ease: "easeInOut",
            }}
            className="relative grow space-y-2"
            action={formAction}
          >
            <Label htmlFor="form-packages-edit--description">
              Edit Package description
            </Label>
            <Textarea
              id="form-packages-edit--description"
              name="description"
              defaultValue={description}
              required
            />
            <Input
              name="id"
              value={id}
              className="h-0 p-0 invisible"
              readOnly
              required
            />
            <div className="mt-4 flex gap-2">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <Check aria-hidden /> Update
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setCanEdit(false)}
                disabled={isLoading}
              >
                <X aria-hidden /> Cancel
              </Button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex"
          >
            <div>
              <span className="text-sm text-neutral-500">
                Package description
              </span>
              <p className="max-w-sm text-nowrap overflow-ellipsis overflow-hidden">
                {description}
              </p>
            </div>
            <Button
              size="icon"
              variant={"outline"}
              className="ml-auto"
              onClick={() => setCanEdit(true)}
            >
              <SquarePen aria-hidden /> <span className="sr-only">Edit</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
function EditPackagePrivatesDiscountForm({
  id,
  privates,
  discount,
  cost,
  className,
}: {
  id: Package["id"];
  privates: Package["numberOfPrivates"];
  discount: Package["discount"];
  cost: Package["cost"];
  className?: string;
}) {
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [state, formAction, isLoading] = useActionState(
    updatePackageNumbersAction,
    { success: false },
  );
  const [newPrivates, setNewPrivates] = useState<number>(privates);
  const [newDiscount, setNewDiscount] = useState<number>(discount);
  const [newCost, setNewCost] = useState<number>(cost / 100);
  useEffect(() => {
    if (state.success) {
      toast("Package numbers updated.");
      setCanEdit(false);
    }
  }, [state]);
  useEffect(() => {
    let total = newPrivates * MINIMUM_PRIVATE_COST;
    let discounted = (newDiscount * total) / 100;
    let discountedTotal = total - discounted;
    if (discountedTotal !== newCost) setNewCost(discountedTotal);
  }, [newPrivates, newDiscount]);
  return (
    <div className={cn(`p-4 ${className}`)}>
      <AnimatePresence>
        {canEdit ? (
          <motion.form
            initial={{
              opacity: 0,
              translateY: 5,
            }}
            animate={{
              opacity: 1,
              translateY: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              ease: "easeInOut",
            }}
            className="relative grow grid gap-4"
            action={formAction}
          >
            <div className="col-span-full flex flex-col gap-1">
              <Label htmlFor="privates">Number of privates</Label>
              <Select
                name="privates"
                value={newPrivates.toString()}
                onValueChange={(v) => setNewPrivates(+v)}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="discount">
                Discount
                <Percent className="size-4" aria-hidden />{" "}
              </Label>
              <Select
                name="discount"
                value={newDiscount.toString()}
                onValueChange={(v) => setNewDiscount(+v)}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="form-packages-edit--cost">
                Cost
                <DollarSign className="size-4" aria-hidden />
              </Label>
              <Input
                id="form-packages-edit--cost"
                name="cost"
                type="text"
                value={newCost}
                required
                readOnly
              />
            </div>
            <Input
              name="id"
              value={id}
              className="h-0 p-0 invisible"
              readOnly
              required
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <Check aria-hidden /> Update
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setNewCost(cost);
                  setNewDiscount(discount);
                  setNewPrivates(privates);
                  setCanEdit(false);
                }}
                disabled={isLoading}
              >
                <X aria-hidden /> Cancel
              </Button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex"
          >
            <div>
              <span className="text-sm text-neutral-500">Package numbers</span>
              <div className="">
                <div>Number of privates: {privates}</div>
                <div className="flex items-center">Discount: {discount}%</div>
                <div>Cost: ${newCost}</div>
              </div>
            </div>
            <Button
              size="icon"
              variant={"outline"}
              className="ml-auto"
              onClick={() => setCanEdit(true)}
            >
              <SquarePen aria-hidden /> <span className="sr-only">Edit</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
