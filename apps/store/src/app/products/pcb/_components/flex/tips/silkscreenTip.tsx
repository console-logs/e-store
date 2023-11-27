import HelpPopover from "@/app/products/pcb/_components/common/helpPopover";

export default function SilkscreenTip() {
	return (
		<HelpPopover>
			<p>
				The color of the silkscreen layer. This should be a different color from the cover layer to ensure
				readability.
			</p>
		</HelpPopover>
	);
}
