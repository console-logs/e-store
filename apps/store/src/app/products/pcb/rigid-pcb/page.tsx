"use client";
import { useToast } from "@shared/components/ui/use-toast";
import { FormEvent, useTransition } from "react";

export default function RigidPcbFabrication() {
  const { toast } = useToast();
  const [_isLoading, startTransition] = useTransition();

  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    startTransition(async () => {
      e.preventDefault();
      //TODO: add rigid pcb to cart func
      toast({
        variant: "default",
        title: "Rigid PCB added to cart",
        description: "We've successfully added your pcb to cart!",
        duration: 4000,
      });
    });
  }
  return (
    <form onSubmit={handleOnSubmit}>
      <div className="mx-auto my-2 max-w-6xl px-4">
        <h1 className=" text-3xl font-bold tracking-tight">
          Rigid Pcb Fabrication
        </h1>
        <div className="grid grid-cols-1 gap-y-3 lg:grid-cols-3 lg:gap-x-4">
          {/* TODO:Form Fields here */}
        </div>
      </div>
    </form>
  );
}
