import AssemblyCapabilities from "@/app/products/pcb/capabilities/_components/assemblyCaps";
import FlexPcbCapabilities from "@/app/products/pcb/capabilities/_components/flexPcbCaps";
import RigidPcbCapabilities from "@/app/products/pcb/capabilities/_components/rigidPcbCaps";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@shared/components/ui/tabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Capabilities",
};
export default function TechnicalCapabilities() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-2 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">
        Technical Capabilities
      </h1>
      <div className="mt-8 space-y-10">
        <Tabs defaultValue="rigidPcb" className="my-4">
          <TabsList className="w-full">
            <TabsTrigger className="w-full text-xs sm:text-sm" value="rigidPcb">
              Rigid pcb
            </TabsTrigger>
            <TabsTrigger className="w-full text-xs sm:text-sm" value="flexPcb">
              Flex pcb
            </TabsTrigger>
            <TabsTrigger
              className="w-full text-xs sm:text-sm"
              value="pcbAssembly"
            >
              Assembly
            </TabsTrigger>
          </TabsList>
          <TabsContent value="rigidPcb">
            <RigidPcbCapabilities />
          </TabsContent>
          <TabsContent value="flexPcb">
            <FlexPcbCapabilities />
          </TabsContent>
          <TabsContent value="pcbAssembly">
            <AssemblyCapabilities />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
