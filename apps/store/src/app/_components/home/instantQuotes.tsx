import BoardSize from "@/app/products/pcb/_components/rigid/fields/boardSize";
import Layer from "@/app/products/pcb/_components/rigid/fields/layer";
import PcbQuantity from "@/app/products/pcb/_components/rigid/fields/pcbQty";
import {
  FLEX_PCB_FAB_PAGE,
  PCB_ASSEMBLY_PAGE,
  RIGID_PCB_FAB_PAGE,
} from "@/lib/routes";
import { Button } from "@shared/components/ui/button";
import { Card, CardContent } from "@shared/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@shared/components/ui/tabs";
import Link from "next/link";

const tabs = [
  { name: "Rigid PCB", value: "rigidPcb", url: RIGID_PCB_FAB_PAGE },
  { name: "Flex PCB", value: "flexPcb", url: FLEX_PCB_FAB_PAGE },
  { name: "PCB Assembly", value: "pcbAssembly", url: PCB_ASSEMBLY_PAGE },
];

export default function PcbInstantQuote() {
  return (
    <div className="my-6">
      <Tabs defaultValue="rigidPcb" className="my-4 xl:mx-36">
        <TabsList className="w-full">
          {tabs.map((tab, tabIdx) => (
            <TabsTrigger
              className="w-full text-xs sm:text-sm"
              value={tab.value}
              key={tabIdx}
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab, tabIdx) => (
          <TabsContent value={tab.value} key={tabIdx}>
            <Card>
              <CardContent className="my-2 lg:flex lg:items-center lg:justify-evenly lg:space-x-4">
                <BoardSize />
                <Layer />
                <PcbQuantity />
                <Button asChild className="mt-6 w-full xl:w-1/2">
                  <Link href={tab.url}>Get Quote</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
