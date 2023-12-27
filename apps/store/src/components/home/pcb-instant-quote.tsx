import { AssemblyBoardType } from "@/components/products/pcb/assembly/fields/assembly-board-type";
import { AssemblyQuantity } from "@/components/products/pcb/assembly/fields/assembly-quantity";
import { AssemblySides } from "@/components/products/pcb/assembly/fields/assembly-sides";
import { FlexBoardSize } from "@/components/products/pcb/flex/fields/flex-board-size";
import { FlexLayer } from "@/components/products/pcb/flex/fields/flex-layer";
import { FlexPcbQuantity } from "@/components/products/pcb/flex/fields/flex-pcb-quantity";
import { RigidBoardSize } from "@/components/products/pcb/rigid/fields/rigid-board-size";
import { RigidLayer } from "@/components/products/pcb/rigid/fields/rigid-layer";
import { RigidPcbQuantity } from "@/components/products/pcb/rigid/fields/rigid-pcb-quantity";
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
							<RigidBoardSize />
							<RigidLayer />
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
							<FlexBoardSize />
							<FlexLayer />
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
							<AssemblyBoardType />
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
