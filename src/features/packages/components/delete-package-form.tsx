"use client";

import { useState, useActionState } from "react";
import { Package } from "@/database/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { deletePackageAction } from "../actions/delete-package-action";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function DeletePackageForm({
  id,
  name,
}: {
  name: string;
  id: Package["id"];
}) {
  const [state, formAction, isLoading] = useActionState(deletePackageAction, {
    success: false,
  });
  const phrase = `delete ${name}`;
  const [input, setInput] = useState<string>("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>
          <Trash2 aria-hidden /> Delete package
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete &quot;{name}&quot;?</DialogTitle>
          <DialogDescription>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit et voluptatibus, incidunt consequatur aut tenetur?
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="">
          <Input
            id="form-package-delete--id"
            name="id"
            className="invisible p-0 size-0"
            value={id}
            readOnly
          />
          <div className="flex flex-col gap-1">
            <Label htmlFor="form-package-delete--intent">
              Type &quot;delete {name}&quot;
            </Label>
            <Input
              id="form-package-delete--intent"
              name="intent"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <Button
            variant={"destructive"}
            type="submit"
            className="mt-4"
            disabled={input !== phrase || isLoading}
          >
            {isLoading ? <LoadingSpinner /> : "Delete"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
