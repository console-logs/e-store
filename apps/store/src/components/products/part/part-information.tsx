import { Badge } from "@packages/shared/components/ui/badge";
import Link from "next/link";

export function PartInformationSection({ partData }: { partData: PartDataType }) {
	const { Description, DatasheetUrl, Availability, Name, Manufacturer, Category, ROHSStatus, Min, Mult } = partData;
	return (
		<div className="lg:max-w-lg lg:self-end">
			<div className="mt-4">
				<h1 className="text-3xl font-bold tracking-tight">{Name}</h1>
			</div>

			<section
				aria-labelledby="information-heading"
				className="mt-4">
				<h2
					id="information-heading"
					className="sr-only">
					Product information
				</h2>

				<div className="mt-4 space-y-6">
					<p className="text-base text-muted-foreground">{Description}</p>
				</div>
				<div className="grid grid-cols-2 mt-4">
					<p className="mt-1 text-sm text-muted-foreground">{Manufacturer}</p>
					<Link
						href={DatasheetUrl}
						className="mt-1 text-sm rounded-md hover:underline">
						Datasheet
					</Link>
					<p className="mt-1 text-sm text-muted-foreground">{Category}</p>
					<p className="mt-1 text-sm text-muted-foreground">{ROHSStatus}</p>
					<p className="mt-1 text-sm text-muted-foreground">Minimum order quantity {Min}</p>
					<p className="mt-1 text-sm text-muted-foreground">Buy in multiples of {Mult}</p>
				</div>

				<div className="mt-4 font-semibold flex items-center">
					<Badge variant={Availability === "On Order" || Availability === "None" ? "destructive" : "default"}>
						{Availability}
					</Badge>
				</div>
				<p className="mt-1 text-sm text-muted-foreground">Available in 5-6 Business days</p>
			</section>
		</div>
	);
}
