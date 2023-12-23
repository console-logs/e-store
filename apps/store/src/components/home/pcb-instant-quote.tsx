import AssemblyQuantity from "@/app/products/pcb/assembly/_components/fields/quantity";
import AssemblySides from "@/app/products/pcb/assembly/_components/fields/sides";
import BoardType from "@/app/products/pcb/assembly/_components/fields/type";
import FlexPcbBoardSize from "@/app/products/pcb/flex-pcb/_components/fields/size";
import FlexPcbLayer from "@/app/products/pcb/flex-pcb/_components/fields/layer";
import FlexPcbQuantity from "@/app/products/pcb/flex-pcb/_components/fields/pcbQty";
import RigidPcbBoardSize from "@/app/products/pcb/rigid-pcb/_components/fields/size";
import RigidPcbLayer from "@/app/products/pcb/rigid-pcb/_components/fields/layer";
import RigidPcbQuantity from "@/app/products/pcb/rigid-pcb/_components/fields/quantity";
import { FLEX_PCB_FAB_PAGE, PCB_ASSEMBLY_PAGE, RIGID_PCB_FAB_PAGE } from "@/lib/routes";
import { Button } from "@shared/components/ui/button";
import { Card, CardContent } from "@shared/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/components/ui/tabs";
import Link from "next/link";

export function PcbInstantQuote() {
	return (
		<div className="my-6">
			<Tabs
				defaultValue="rigidPcb"
				className="my-4 xl:mx-36">
				<TabsList className="w-full">
					<TabsTrigger
						className="w-full text-xs sm:text-sm"
						value="rigidPcb">
						Rigid PCB
					</TabsTrigger>
					<TabsTrigger
						className="w-full text-xs sm:text-sm"
						value="flexPcb">
						Flex PCB
					</TabsTrigger>
					<TabsTrigger
						className="w-full text-xs sm:text-sm"
						value="pcbAssembly">
						PCB Assembly
					</TabsTrigger>
				</TabsList>
				{/* Rigid Pcb */}
				<TabsContent value="rigidPcb">
					<Card>
						<CardContent className="my-2 lg:flex lg:items-center lg:justify-evenly lg:space-x-4">
							<RigidPcbBoardSize />
							<RigidPcbLayer />
							<RigidPcbQuantity />
							<Button
								asChild
								className="mt-6 w-full xl:w-1/2">
								<Link href={RIGID_PCB_FAB_PAGE}>Get Quote</Link>
							</Button>
						</CardContent>
					</Card>
				</TabsContent>
				{/* Flex Pcb */}
				<TabsContent value="flexPcb">
					<Card>
						<CardContent className="my-2 lg:flex lg:items-center lg:justify-evenly lg:space-x-4">
							<FlexPcbBoardSize />
							<FlexPcbLayer />
							<FlexPcbQuantity />
							<Button
								asChild
								className="mt-6 w-full xl:w-1/2">
								<Link href={FLEX_PCB_FAB_PAGE}>Get Quote</Link>
							</Button>
						</CardContent>
					</Card>
				</TabsContent>
				{/* Pcb Assembly */}
				<TabsContent value="pcbAssembly">
					<Card>
						<CardContent className="my-2 lg:flex lg:items-center lg:justify-evenly lg:space-x-4">
							<BoardType />
							<AssemblySides />
							<AssemblyQuantity />
							<Button
								asChild
								className="mt-6 w-full xl:w-1/2">
								<Link href={PCB_ASSEMBLY_PAGE}>Get Quote</Link>
							</Button>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
