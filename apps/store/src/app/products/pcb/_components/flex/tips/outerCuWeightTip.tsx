import HelpPopover from "@/app/products/pcb/_components/common/helpPopover";

export default function OuterCuWeightTip() {
	return (
		<HelpPopover>
			<p>
				The copper thickness on outer layers, in ounces (oz) Single-sided FPC: 0.07 mm FPC uses 0.5 oz (18 μm);
				0.11 mm FPC uses 1 oz (35 μm). Double-sided FPC: 0.11 mm FPC uses 1/3 oz (12 μm); 0.12 mm FPC uses 0.5
				oz (18 μm); 0.2 mm FPC uses 1 oz (35 μm).
			</p>
		</HelpPopover>
	);
}
