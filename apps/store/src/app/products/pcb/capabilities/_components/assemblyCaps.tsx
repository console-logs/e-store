import { pcbAssemblySpecifications } from "@/content/assemblyCapabilities";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@shared/components/ui/table";

export default function PcbAssemblyCapabilities() {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-96 ">Features</TableHead>
					<TableHead>Capability</TableHead>
				</TableRow>
			</TableHeader>
			{Object.keys(pcbAssemblySpecifications).map((specification, idx) => (
				<TableBody key={idx}>
					<TableRow>
						<TableCell>{specification}</TableCell>
						<TableCell>{pcbAssemblySpecifications[specification]}</TableCell>
					</TableRow>
				</TableBody>
			))}
		</Table>
	);
}
