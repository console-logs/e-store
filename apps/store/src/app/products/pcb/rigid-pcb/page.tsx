"use client";
import AddPcbToCartBtn from "@/app/products/pcb/_components/common/addToCart";
import PcbName from "@/app/products/pcb/_components/rigid/pcbName";
import { useToast } from "@shared/components/ui/use-toast";
import { useTransition, type FormEvent } from "react";

export default function RigidPcbFabrication() {
  const { toast } = useToast();
  const [isLoading, startTransition] = useTransition();

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
          <div className="mt-8 grid grid-cols-1 gap-y-6 sm:col-span-2 sm:grid-cols-2 sm:gap-x-4">
            <PcbName />
          </div>
          <div className="mt-8 space-y-4">
            <AddPcbToCartBtn isLoading={isLoading} />
          </div>
        </div>
      </div>
    </form>
  );
}
